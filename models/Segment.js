import mongoose from 'mongoose';

const SegmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
  name: { type: String, required: true },
  criteria: { type: [String], required: true },
  count: { type: Number, default: 0 },
});

export default mongoose.model('Segment', SegmentSchema);