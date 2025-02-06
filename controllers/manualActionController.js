import ManualAction from '../models/ManualAction.js';

// Create a new manual action
export const createManualAction = async (req, res) => {
  try {
    const newManualAction = new ManualAction(req.body);
    await newManualAction.save();
    res.status(201).json(newManualAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all manual actions
export const getManualActions = async (req, res) => {
  try {
    const manualActions = await ManualAction.find();
    res.status(200).json(manualActions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single manual action by ID
export const getManualActionById = async (req, res) => {
  try {
    const manualAction = await ManualAction.findById(req.params.id);
    if (!manualAction) return res.status(404).json({ message: 'Manual action not found' });
    res.status(200).json(manualAction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a manual action
export const updateManualAction = async (req, res) => {
  try {
    const manualAction = await ManualAction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!manualAction) return res.status(404).json({ message: 'Manual action not found' });
    res.status(200).json(manualAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a manual action
export const deleteManualAction = async (req, res) => {
  try {
    const manualAction = await ManualAction.findByIdAndDelete(req.params.id);
    if (!manualAction) return res.status(404).json({ message: 'Manual action not found' });
    res.status(200).json({ message: 'Manual action deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};