import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  recurring: { type: Boolean, default: false },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;