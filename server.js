import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import slotRoutes from './slotRoutes.js';
import csvHistoryRoutes from './routes/csvHistoryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import importRoutes from './routes/importRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js'
import pipelineRoutes from './routes/pipelineRoutes.js';
import bulkActionRoutes from './routes/bulkActionRoutes.js';
import meetingRoutes from './routes/meetingRoutes.js'

import conversationRoutes from './routes/conversationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import snippetRoutes from './routes/snippetRoutes.js';
import folderRoutes from './routes/folderRoutes.js';
import manualActionRoutes from './routes/manualActionRoutes.js';
import triggerLinkRoutes from './routes/triggerLinkRoutes.js';
import businessProfileRoutes from './routes/businessProfileRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/pipelines', pipelineRoutes);
app.use('/api/bulk-actions', bulkActionRoutes);
app.use('/api/import', importRoutes);
app.use('/api/meeting', meetingRoutes)
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/manual-actions', manualActionRoutes);
app.use('/api/trigger-links', triggerLinkRoutes);
app.use('/api/business-profile', businessProfileRoutes);
// MongoDB connection
mongoose.connect('mongodb+srv://root:root@cluster0.27cqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});