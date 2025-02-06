import mongoose from 'mongoose';

const BusinessProfileSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  businessEmail: { type: String, required: true },
  businessPhone: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessLogo: { type: String }, // Store the URL or base64 string of the logo
});

export default mongoose.model('BusinessProfile', BusinessProfileSchema);