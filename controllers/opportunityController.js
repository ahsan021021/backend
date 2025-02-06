import Opportunity from '../models/Opportunity.js';

export const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate('pipeline');
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOpportunity = async (req, res) => {
  const opportunity = new Opportunity(req.body);
  try {
    const savedOpportunity = await opportunity.save();
    res.status(201).json(savedOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    await Opportunity.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};