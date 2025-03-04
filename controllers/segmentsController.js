import Segment from '../models/Segment.js';

export const getSegments = async (req, res) => {
  try {
    const segments = await Segment.find({ userId: req.user.id });
    res.json(segments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching segments' });
  }
};

export const createSegment = async (req, res) => {
  try {
    const newSegment = new Segment({ ...req.body, userId: req.user.id });
    await newSegment.save();
    res.status(201).json(newSegment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating segment' });
  }
};

export const deleteSegment = async (req, res) => {
  try {
    await Segment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting segment' });
  }
};