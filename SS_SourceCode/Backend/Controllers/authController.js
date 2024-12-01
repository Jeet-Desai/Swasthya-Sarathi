import Patient from '../Models/PatientModel.js'; 
import Hospital from '../Models/HospitalModel.js'; // Importing the Hospital model
import Doctor from '../Models/DoctorModel.js'; // Importing the Doctor model (same as hospital model)
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dns from 'dns'; 
import { generateOTP, sendOTPEmail } from '../utils/emailService.js';
import OTP from '../Models/OTPModel.js';
 
export const validateEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format!' });
  }

  const domain = email.split('@')[1];

  dns.resolveMx(domain, (err, addresses) => {
    if (err || addresses.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid email domain!' });
    } 

    res.status(200).json({ success: true, message: 'Email is valid!' });
  }); 
};
export const sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Generate OTP
    const otp = generateOTP();
    console.log('Generated OTP:', otp);

    // Save OTP to database
    await OTP.findOneAndUpdate(
      { email },
      { email, otp },
      { upsert: true, new: true }
    );
    console.log('OTP saved to database for email:', email);

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp);
    if (!emailSent) {
      throw new Error('Failed to send email');
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP'
    });
  }
};

export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Find the OTP document
    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found'
      });
    }

    // Verify OTP
    if (otpDoc.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // Delete the used OTP
    await OTP.deleteOne({ email });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP'
    });
  }
};

export const Register = async (req, res) => {
  const {
    email,
    name,
    password,
    confirmPassword,
    contactNo,
    nationality,
    dob,
    gender,
    bloodGroup, 
    role, // patient or hospital
    dof, // Date of foundation (specific to hospital)
    type, // Type of hospital (Gov, Semi-Gov, Private)
    registration_no, // Registration number (specific to hospital)
  } = req.body;

  try {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    let user = null;

    // Check if the role is a Patient or a Hospital
    if (role === "patient") {
      // Check if patient already exists
      user = await Patient.findOne({ email });
    } else if (role === "hospital") {
      // Check if hospital already exists
      user = await Hospital.findOne({ email });
    }

    // If user exists, return error
    if (user) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(password, salt);

    // Create the appropriate user based on the role
    if (role === "patient") {
      // Create a new patient
      user = new Patient({
        email,
        name,
        password: hashed_pass,
        contactNo,
        nationality,
        dob,
        gender,
        bloodGroup,
        appointments: [],
      });
    } 
    else if (role === "hospital") {
      // Create a new hospital
      user = new Hospital({
        email,
        name,
        password: hashed_pass,
        contactNo,
        dof, // Date of foundation
        type, // Type of hospital
        registration_no, // Registration number
        role, // hospital role
      });
    }
    console.log(req.body)
    // Save the user to the database
    await user.save();

    res.status(200).json({ success: true, message: "User registered successfully!" });

  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const Login = async (req, res) => {
    try {
        const { email, password: pass, type} = req.body;
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email format
        if (!email || !emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format!" });
        }

        // Check if email, password, and type are provided
        if (!email || !pass) {
            return res.status(400).json({ message: "Email, password, and type are required" });
        }
        
        let user = null;

        // Check user type and find user accordingly
        if (type === "patient") {
            user = await Patient.findOne({ email });
        } else if (type === "hospital") {
            user = await Hospital.findOne({ email });
        } 
        else if (type === "doctor") {
          user = await Doctor.findOne({ email });
        } 
        else {
            return res.status(400).json({ message: "Invalid user type" });
        }

        // User not found
        if (!user) {
            return res.status(404).json({ message: "User account does not exist, you might consider registering" });
        }

        // Authenticate user by comparing password
        const isPasswordCorrect = await bcrypt.compare(pass, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ status: false, message: "Invalid password. Try again." });
        }
        const typo = req.body.type;
        // Generate JWT token
        const token = await jwt.sign({ id: user._id, role: typo }, process.env.JWT_SEC, { expiresIn: '30d' });

        // Exclude the password and send user data along with the token
        const { password, role, appointments, ...rest } = user._doc;
        res.status(200).json({
            status: true,
            message: `Login successful, Welcome ${user?.name}`,
            token,
            user: { ...rest },
            role:typo,
        }); 
         
    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).json({ status: 500, message: "Login failed, sorry." });
    }
};
