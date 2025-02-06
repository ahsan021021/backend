import Pipeline from '../models/pipelineModel.js';

export const getPipelines = async (req, res) => {
  try {
    const pipelines = await Pipeline.find();
    res.status(200).json(pipelines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPipeline = async (req, res) => {
  const pipeline = new Pipeline(req.body);
  try {
    const savedPipeline = await pipeline.save();
    res.status(201).json(savedPipeline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePipeline = async (req, res) => {
  try {
    const updatedPipeline = await Pipeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPipeline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePipeline = async (req, res) => {
  try {
    await Pipeline.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pipeline deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};