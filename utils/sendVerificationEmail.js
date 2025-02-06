// utils/sendVerificationEmail.js
import nodemailer from 'nodemailer';

// Export the sendVerificationEmail function using named export
export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    // Setup transporter (Mailtrap for testing purposes)
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '3c59724290a6b8',
        pass: 'c96e518b6974fa',
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'no-reply@example.com',
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Verification code sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
