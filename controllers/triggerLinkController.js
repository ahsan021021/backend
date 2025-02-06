import TriggerLink from '../models/TriggerLink.js';

// Create a new trigger link
export const createTriggerLink = async (req, res) => {
  try {
    const newTriggerLink = new TriggerLink(req.body);
    await newTriggerLink.save();
    res.status(201).json(newTriggerLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all trigger links
export const getTriggerLinks = async (req, res) => {
  try {
    const triggerLinks = await TriggerLink.find();
    res.status(200).json(triggerLinks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single trigger link by ID
export const getTriggerLinkById = async (req, res) => {
  try {
    const triggerLink = await TriggerLink.findById(req.params.id);
    if (!triggerLink) return res.status(404).json({ message: 'Trigger link not found' });
    res.status(200).json(triggerLink);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a trigger link
export const updateTriggerLink = async (req, res) => {
  try {
    const triggerLink = await TriggerLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!triggerLink) return res.status(404).json({ message: 'Trigger link not found' });
    res.status(200).json(triggerLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a trigger link
export const deleteTriggerLink = async (req, res) => {
  try {
    const triggerLink = await TriggerLink.findByIdAndDelete(req.params.id);
    if (!triggerLink) return res.status(404).json({ message: 'Trigger link not found' });
    res.status(200).json({ message: 'Trigger link deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};