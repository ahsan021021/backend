import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  contactId: mongoose.Schema.Types.ObjectId,
  opportunityName: String,
  pipeline: String,
  stage: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;