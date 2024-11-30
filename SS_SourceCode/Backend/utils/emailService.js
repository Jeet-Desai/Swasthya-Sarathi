import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use app-specific password
  }
});

// Generate OTP
export const generateOTP = () => {
  return randomstring.generate({
    length: 6,
    charset: 'numeric'
  });
};

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  try {
    console.log('Sending email to:', email);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification OTP - Swasthya Sarathi',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Email Verification</h2>
          <p>Your OTP for email verification is:</p>
          <h1 style="color: #4CAF50;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};