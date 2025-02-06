import AppointmentModel from '../models/appointmentModel.js';
import SlotModel from '../models/slotModel.js';

// List all appointments
export const list = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single appointment by ID
export const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new appointment
export const create = async (req, res) => {
  try {
    const { name, email, slotId } = req.body;

    // Check if the slot is available
    const slot = await SlotModel.findById(slotId);
    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: 'Slot is not available.' });
    }

    // Create new appointment
    const appointment = new AppointmentModel({ name, email, slotId });
    await appointment.save();

    // Mark slot as booked
    slot.isBooked = true;
    await slot.save();

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update an existing appointment
export const update = async (req, res) => {
  try {
    const { name, email, slotId } = req.body;
    const { id } = req.params;

    // Find the appointment
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    // Check if the new slot is available
    const slot = await SlotModel.findById(slotId);
    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: 'Slot is not available.' });
    }

    // Update the appointment
    appointment.name = name;
    appointment.email = email;
    appointment.slotId = slotId;
    await appointment.save();

    // Mark the new slot as booked and previous slot as available
    const prevSlot = await SlotModel.findById(appointment.slotId);
    prevSlot.isBooked = false;
    await prevSlot.save();

    slot.isBooked = true;
    await slot.save();

    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Remove an appointment
export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the appointment
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    // Mark the slot as available
    const slot = await SlotModel.findById(appointment.slotId);
    slot.isBooked = false;
    await slot.save();

    // Remove the appointment
    await appointment.remove();

    res.json({ message: 'Appointment removed successfully.' });
  } catch (error) {
    console.error('Error removing appointment:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};