import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  folder: { type: String, required: true },
  type: { type: String, enum: ['text', 'email'], required: true },
  subject: { type: String }, // Only for email snippets
});

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;