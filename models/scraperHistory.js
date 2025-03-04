// backend/models/CSVHistory.js
import mongoose from 'mongoose';

const CSVHistorySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  fileName: { type: String, required: true },
  keywords: { type: [String], required: true },
  locations: { type: [String], required: true },
  recordCount: { type: Number, required: true },
  data: { type: String, required: true },
});

export default mongoose.model('CSVHistory', CSVHistorySchema);