import Contact from '../models/Contact.js';
import Opportunity from '../models/Opportunity.js';
import ImportHistory from '../models/importHistoryModel.js';

export const importContacts = async (req, res) => {
  try {
    const contacts = req.body;
    const result = await Contact.insertMany(contacts);
    await ImportHistory.create({ type: 'contacts', count: contacts.length });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error importing contacts:', error);
    res.status(400).json({ message: error.message });
  }
};

export const importOpportunities = async (req, res) => {
  try {
    const opportunities = req.body;
    const result = await Opportunity.insertMany(opportunities);
    await ImportHistory.create({ type: 'opportunities', count: opportunities.length });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error importing opportunities:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getImportHistory = async (req, res) => {
  try {
    const history = await ImportHistory.find().sort({ timestamp: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching import history:', error);
    res.status(500).json({ message: error.message });
  }
};