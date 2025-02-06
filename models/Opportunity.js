import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  opportunityName: { type: String, required: true },
  pipeline: { type: String, required: true },
  stage: { type: String },
  status: { type: String },
  created: { type: Date, default: Date.now },
});

const Opportunity = mongoose.models.Opportunity || mongoose.model('Opportunity', opportunitySchema);
export default Opportunity;