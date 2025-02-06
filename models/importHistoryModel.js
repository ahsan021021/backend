import mongoose from 'mongoose';

const importHistorySchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'contacts' or 'opportunities'
  timestamp: { type: Date, default: Date.now },
  count: { type: Number, required: true },
});

export default mongoose.models.ImportHistory || mongoose.model('ImportHistory', importHistorySchema);