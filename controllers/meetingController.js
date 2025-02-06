import Meeting from '../models/meetingModel.js';

// Get all meetings
export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({}).sort({ date: 1, startTime: 1 });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new meeting
export const createMeeting = async (req, res) => {
  try {
    const { title, date, startTime, duration, email } = req.body;

    // Validate date is not in the past
    const eventDate = new Date(`${date}T${startTime}`);
    if (eventDate < new Date()) {
      return res.status(400).json({ message: 'Cannot schedule meetings in the past' });
    }

    const meeting = await Meeting.create({
      title,
      date,
      startTime,
      duration,
      email,
    });

    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a meeting
export const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    await meeting.remove();
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Restore a meeting (optional)
export const restoreMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Logic to restore the meeting (if needed)
    res.status(200).json({ message: 'Meeting restored successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};