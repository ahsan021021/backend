import Conversation from '../models/Conversation.js';

// Create a new conversation
export const createConversation = async (req, res) => {
  try {
    const newConversation = new Conversation(req.body);
    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all conversations
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.status(200).json(conversations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single conversation by ID
export const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) return res.status(404).json({ message: 'Conversation not found' });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a conversation
export const updateConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!conversation) return res.status(404).json({ message: 'Conversation not found' });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a conversation
export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndDelete(req.params.id);
    if (!conversation) return res.status(404).json({ message: 'Conversation not found' });
    res.status(200).json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};