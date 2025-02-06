import mongoose from 'mongoose';

const pipelineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  stages: [{ type: String }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.models.Pipeline || mongoose.model('Pipeline', pipelineSchema);