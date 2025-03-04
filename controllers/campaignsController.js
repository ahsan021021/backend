import Campaign from '../models/Compaign.js';
import Subscriber from '../models/Subscriber.js';
import EmailSettings from '../models/EmailSettings.js';
import nodemailer from 'nodemailer';

// Get all campaigns for a user
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.userId });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns' });
  }
};

// Create a new campaign
export const createCampaign = async (req, res) => {
  try {
    const newCampaign = new Campaign({ ...req.body, userId: req.userId });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error: error.message });
  }
};

// Update an existing campaign
export const updateCampaign = async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign' });
  }
};

// Delete a campaign
export const deleteCampaign = async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting campaign' });
  }
};

// Send campaign emails
export const sendCampaignEmails = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('recipients');
    const emailSettings = await EmailSettings.findOne({ userId: campaign.userId });

    if (!emailSettings) {
      return res.status(404).json({ message: 'Email settings not found' });
    }

    // Filter active subscribers associated with the user ID
    const activeSubscribers = campaign.recipients.filter(subscriber => subscriber.status === 'active' && subscriber.userId.toString() === req.userId);

    // Create a transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      host: emailSettings.smtpServer,
      port: emailSettings.port,
      secure: emailSettings.security === 'ssl', // true for 465, false for other ports
      auth: {
        user: emailSettings.fromEmail,
        pass: emailSettings.emailPassword,
      },
    });

    // Send emails to each active recipient
    const promises = activeSubscribers.map(subscriber => {
      return transporter.sendMail({
        from: `${emailSettings.fromName} <${emailSettings.fromEmail}>`,
        to: subscriber.email,
        subject: campaign.subject,
        html: campaign.content,
      });
    });

    // Wait for all emails to be sent
    await Promise.all(promises);

    // Update campaign status
    campaign.status = 'sent';
    await campaign.save();

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails', error: error.message });
  }
};

// Set campaign to draft
export const setCampaignToDraft = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    campaign.status = 'draft';
    await campaign.save();
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error setting campaign to draft' });
  }
};