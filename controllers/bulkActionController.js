import BulkAction from '../models/bulkActionModel.js';

export const getBulkActions = async (req, res) => {
  try {
    const bulkActions = await BulkAction.find();
    res.status(200).json(bulkActions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBulkAction = async (req, res) => {
  const bulkAction = new BulkAction(req.body);
  try {
    const savedBulkAction = await bulkAction.save();
    res.status(201).json(savedBulkAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBulkAction = async (req, res) => {
  try {
    const updatedBulkAction = await BulkAction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBulkAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBulkAction = async (req, res) => {
  try {
    await BulkAction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Bulk action deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};