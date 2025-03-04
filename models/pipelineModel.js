import mongoose from 'mongoose';

const stageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true }
});

const pipelineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  stages: [stageSchema],
  visibleInFunnel: { type: Boolean, default: true },
  visibleInPie: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Pipeline = mongoose.model('Pipeline', pipelineSchema);

export default Pipeline;