import SlotModel from '../models/slotModel.js';  // Import the slot model
import mongoose from 'mongoose';  // Import mongoose for ObjectId validation

// Function to create a slot
export const createSlot = async (req, res) => {
  try {
    const { slot_time, slot_date } = req.body;

    // Create a new slot
    const newSlot = new SlotModel({
      slot_time,
      slot_date,
      created_at: Date.now()
    });

    // Save the slot to the database
    await newSlot.save();

    res.status(201).json({ message: 'Slot created successfully' });
  } catch (error) {
    console.error('Create Slot Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to get a single slot by ID
export const getSlot = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const slot = await SlotModel.findById(id);

    if (!slot) {
      return res.status(400).json({ message: 'Slot not found' });
    }

    res.json(slot);
  } catch (error) {
    console.error('Get Slot Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to get all slots
export const getAllSlots = async (req, res) => {
  try {
    // Fetch all slots from the database
    const slots = await SlotModel.find();

    res.json(slots);
  } catch (error) {
    console.error('Get All Slots Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to update a slot
export const updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { slot_time, slot_date } = req.body;

    // Find the slot by ID and update it
    const updatedSlot = await SlotModel.findByIdAndUpdate(id, {
      slot_time,
      slot_date
    }, { new: true });

    if (!updatedSlot) {
      return res.status(400).json({ message: 'Slot not found' });
    }

    res.json(updatedSlot);
  } catch (error) {
    console.error('Update Slot Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to delete a slot
export const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the slot by ID and delete it
    const deletedSlot = await SlotModel.findByIdAndRemove(id);
    if (!deletedSlot) {
      return res.status(400).json({ message: 'Slot not found' });
    }

    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error('Delete Slot Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
