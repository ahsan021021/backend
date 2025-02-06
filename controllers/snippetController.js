import Snippet from '../models/Snippet.js';

// Create a new snippet
export const createSnippet = async (req, res) => {
  try {
    const newSnippet = new Snippet(req.body);
    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all snippets
export const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.status(200).json(snippets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single snippet by ID
export const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.status(200).json(snippet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a snippet
export const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.status(200).json(snippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a snippet
export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.status(200).json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};