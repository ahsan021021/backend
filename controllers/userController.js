import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';

const JWT_SECRET = 'your-hardcoded-secret-key';  // Replace with your actual secret key

// Function to generate a random verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit code
};

// Function to signup the user
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification code
    const verificationCode = generateVerificationCode();

    // Create a new user
    const user = new UserModel({ email, password: hashedPassword, verificationCode });
    const savedUser = await user.save();

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({ message: 'User created, please verify your email' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to verify the user's email
export const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or verification code' });
    }

    // Check if the verification code matches
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: 'Invalid email or verification code' });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    // Update the user's verification status
    user.isVerified = true;
    user.verificationCode = null; // Clear the verification code
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email Verification Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to login the user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};