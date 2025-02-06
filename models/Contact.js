import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  created: { type: Date, default: Date.now },
  starred: { type: Boolean, default: false }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;