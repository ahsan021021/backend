// filepath: [scraperController.js](http://_vscodecontentref_/2)
import { Client } from '@googlemaps/google-maps-services-js';
import CSVHistory from '../models/scraperHistory.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({});

// Scrape data using Google Maps API
export const scrape = async (req, res) => {
  const { keywords, locations } = req.body;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const results = [];

  try {
    for (const keyword of keywords) {
      for (const location of locations) {
        // Search for places using the Google Places API
        const response = await client.textSearch({
          params: {
            query: `${keyword} in ${location}`,
            key: apiKey,
          },
        });

        // Process the results
        response.data.results.forEach((place, index) => {
          results.push({
            id: `${results.length + 1}`,
            businessName: place.name,
            address: place.formatted_address || 'N/A',
            phone: place.formatted_phone_number || 'N/A',
            website: place.website || 'N/A',
            rating: place.rating || 'N/A',
            reviews: place.user_ratings_total || 0,
            category: keyword,
            location: location,
          });
        });
      }
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error scraping Google Maps:', error);
    res.status(500).json({ error: 'An error occurred while scraping.' });
  }
};

// Export data to CSV
export const exportToCSV = async (req, res) => {
  const { results } = req.body;
  if (!results || results.length === 0) {
    return res.status(400).json({ error: 'No results to export.' });
  }

  const headers = Object.keys(results[0]).join(',');
  const csvRows = results.map(row =>
    Object.values(row)
      .map(value => (typeof value === 'string' && value.includes(',') ? `"${value}"` : value))
      .join(',')
  );

  const csvContent = [headers, ...csvRows].join('\n');

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const fileName = `google_maps_scraper_${formattedDate}.csv`;

  const newHistoryEntry = new CSVHistory({
    fileName,
    keywords: [...new Set(results.map(item => item.category))],
    locations: [...new Set(results.map(item => item.location))],
    recordCount: results.length,
    data: csvContent,
  });

  await newHistoryEntry.save();

  res.status(200).json({ csvContent, fileName });
};

// Get CSV history
export const getCSVHistory = async (req, res) => {
  try {
    const history = await CSVHistory.find().sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching history.' });
  }
};

// Delete CSV history
export const deleteCSVHistory = async (req, res) => {
  const { id } = req.params;
  try {
    await CSVHistory.findByIdAndDelete(id);
    res.status(200).json({ message: 'CSV history deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting history.' });
  }
};

export default {
  scrape,
  exportToCSV,
  getCSVHistory,
  deleteCSVHistory,
};