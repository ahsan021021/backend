import Folder from '../models/Folder.js';

// Create a new folder
export const createFolder = async (req, res) => {
  try {
    const newFolder = new Folder(req.body);
    await newFolder.save();
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all folders
export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find();
    res.status(200).json(folders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single folder by ID
export const getFolderById = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    res.status(200).json(folder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a folder
export const updateFolder = async (req, res) => {
  try {
    const folder = await Folder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    res.status(200).json(folder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a folder
export const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findByIdAndDelete(req.params.id);
    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};