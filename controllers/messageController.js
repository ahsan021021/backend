import Message from '../models/Message.js';

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all messages for a conversation
export const getMessagesByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a message
export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};