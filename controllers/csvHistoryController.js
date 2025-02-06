import CsvHistory from '../models/csvHistoryModel.js';

// Get CSV upload history for a user
export const getCsvHistory = async (req, res) => {
  try {
    const history = await CsvHistory.find({ userId: req.user.id });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};