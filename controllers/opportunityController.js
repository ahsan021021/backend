import Opportunity from '../models/Opportunity.js';

// Create a new Opportunity
export const createOpportunity = async (req, res) => {
  const { title, value } = req.body;

  const opportunity = new Opportunity({
    title,
    value,
    userId: req.userId, // Associate with userId
  });

  try {
    const savedOpportunity = await opportunity.save();
    res.status(201).json(savedOpportunity);
  } catch (error) {
    console.error('Error creating opportunity:', error); // Log the error
    res.status(400).json({ message: error.message });
  }
};

// Create or Update Opportunity
export const updateOpportunity = async (req, res) => {
  try {
    const { title, value } = req.body;
    console.log('Received data for update:', req.body); // Log the received data

    let opportunity = await Opportunity.findOne({ userId: req.userId });
    console.log('Existing opportunity found:', opportunity); // Log the existing opportunity if found

    if (!opportunity) {
      opportunity = new Opportunity({ 
        title, 
        value,
        userId: req.userId // Associate with userId
      });
      console.log('Creating new opportunity:', opportunity); // Log the new opportunity creation
    } else {
      opportunity.title = title;
      opportunity.value = value;
      console.log('Updating existing opportunity:', opportunity); // Log the update
    }

    await opportunity.save();
    console.log('Opportunity saved successfully:', opportunity); // Log the saved opportunity
    res.status(200).json({ message: 'Opportunity updated successfully' });
  } catch (error) {
    console.error('Error updating opportunity:', error); // Log the error
    res.status(500).json({ message: 'An error occurred while updating the opportunity' });
  }
};

export const getOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findOne({ _id: req.params.id, userId: req.userId });
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    res.status(200).json(opportunity);
  } catch (error) {
    console.error('Error fetching opportunity:', error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching the opportunity' });
  }
};

export const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ userId: req.userId });
    if (!opportunities.length) {
      return res.status(404).json({ message: 'No opportunities found' });
    }
    console.log('Opportunities retrieved successfully:', opportunities); // Logging the retrieved opportunities
    res.status(200).json(opportunities);
  } catch (error) {
    console.error('Error fetching opportunities:', error); // Logging the error
    res.status(500).json({ message: 'An error occurred while fetching the opportunities' });
  }
};

// Delete an Opportunity
export const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    res.status(200).json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    console.error('Error deleting opportunity:', error); // Log the error
    res.status(500).json({ message: 'An error occurred while deleting the opportunity' });
  }
};
