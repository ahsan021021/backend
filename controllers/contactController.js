import Contact from '../models/Contact.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.userId });
    res.status(200).json(contacts);
  } catch ( error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  const contact = new Contact({
    ...req.body,
    userId: req.userId,
  });

  try {
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.json({ message: 'Contact removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
