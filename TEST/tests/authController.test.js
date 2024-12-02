import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../Swasthya-Sarathi/TEST/index.js';
import Patient from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/PatientModel.js';
import Hospital from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/HospitalModel.js';
import Doctor from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/DoctorModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dns from 'dns';

chai.use(chaiHttp);
const { expect } = chai;

describe('Authentication Controller Tests', () => {
  before(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/test-db');
      console.log('Connected to test database');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  });

  after(async () => {
    try {
      await mongoose.connection.close();
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  });

  beforeEach(async () => {
    await Promise.all([
      Patient.deleteMany({}),
      Hospital.deleteMany({}),
      Doctor.deleteMany({})
    ]);
  });

  describe('Email Validation', () => {
    it('should validate correct email format', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/validate-email')
        .send({ email: 'test@example.com' });

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.message).to.equal('Email is valid!');
    });

    it('should reject invalid email format', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/validate-email')
        .send({ email: 'invalid-email' });

      expect(res).to.have.status(400);
      expect(res.body.success).to.be.false;
    });

    it('should reject empty email', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/validate-email')
        .send({});

      expect(res).to.have.status(400);
      expect(res.body.success).to.be.false;
    });

    it('should handle invalid email domain', async () => {
      // Mock DNS resolution to simulate invalid domain
      const originalResolveMx = dns.resolveMx;
      dns.resolveMx = (domain, callback) => callback(new Error('Invalid domain'), null);

      const res = await chai
        .request(app)
        .post('/api/v1/auth/validate-email')
        .send({ email: 'test@invalid-domain-that-does-not-exist.com' });

      expect(res).to.have.status(400);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Invalid email domain!');

      // Restore original DNS resolution
      dns.resolveMx = originalResolveMx;
    });

    // Alternative test for empty addresses array
    it('should handle domain with no MX records', async () => {
      // Mock DNS resolution to simulate domain with no MX records
      const originalResolveMx = dns.resolveMx;
      dns.resolveMx = (domain, callback) => callback(null, []);

      const res = await chai
        .request(app)
        .post('/api/v1/auth/validate-email')
        .send({ email: 'test@domain-without-mx.com' });

      expect(res).to.have.status(400);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Invalid email domain!');

      // Restore original DNS resolution
      dns.resolveMx = originalResolveMx;
    });
  });

  describe('User Registration', () => {
    it('should register a new patient successfully', async () => {
      const newPatient = {
        email: 'patient@test.com',
        name: 'Test Patient',
        password: 'Test@123',
        confirmPassword: 'Test@123',
        contactNo: '1234567890',
        nationality: 'Indian',
        dob: '1990-01-01',
        gender: 'Male',
        bloodGroup: 'O+',
        role: 'patient'
      };

      const res = await chai
        .request(app)
        .post('/api/v1/auth/register')
        .send(newPatient);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
    });

    it('should register a new hospital successfully', async () => {
      const newHospital = {
        email: 'hospital@test.com',
        name: 'Test Hospital',
        password: 'Test@123',
        confirmPassword: 'Test@123',
        contactNo: '1234567890',
        dof: '1990-01-01',
        type: 'Private',
        registration_no: 'REG123',
        role: 'hospital'
      };

      const res = await chai
        .request(app)
        .post('/api/v1/auth/register')
        .send(newHospital);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
    });

    it('should reject registration with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'Test@123',
        confirmPassword: 'Test@123',
        role: 'patient'
      };

      const res = await chai
        .request(app)
        .post('/api/v1/auth/register')
        .send(userData);

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('Invalid email format!');
    });

    it('should reject registration with mismatched passwords', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password456',
        role: 'patient'
      };

      const res = await chai
        .request(app)
        .post('/api/v1/auth/register')
        .send(userData);

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('Passwords do not match!');
    });

    it('should reject registration for existing user', async () => {
      // First create a user
      await Patient.create({
        email: 'existing@test.com',
        password: 'Test@123',
        name: 'Existing User',
        nationality: 'Indian',
        dob: '1990-01-01',
        gender: 'Male',
        bloodGroup: 'O+'
      });

      // Try to register with same email
      const res = await chai
        .request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'existing@test.com',
          password: 'Test@123',
          confirmPassword: 'Test@123',
          role: 'patient'
        });

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('User already exists!');
    });

    it('should handle server error during registration', async () => {
      // Force an error by passing invalid data
      const res = await chai
        .request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test@123',
          confirmPassword: 'Test@123',
          role: 'invalid_role'
        });

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      const password = await bcrypt.hash('Test@123', 10);
      
      // Create test users
      await Patient.create({
        email: 'patient@test.com',
        password,
        name: 'Test Patient',
        nationality: 'Indian',
        dob: '1990-01-01',
        gender: 'Male',
        bloodGroup: 'O+'
      });

      await Hospital.create({
        email: 'hospital@test.com',
        password,
        name: 'Test Hospital',
        contactNo: '1234567890',
        dof: '1990-01-01',
        type: 'Private',
        registration_no: 'REG123'
      });

      await Doctor.create({
        email: 'doctor@test.com',
        password,
        name: 'Test Doctor',
        phone: '1234567890',
        gender: 'Male',
        specialization: 'General',
        qualification: 'MBBS',
        experience: '5 years',
        about: 'Test doctor',
        dob: new Date(),
        nationality: 'Indian'
      });
    });

    it('should login patient successfully', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'patient@test.com',
          password: 'Test@123',
          type: 'patient'
        });

      expect(res).to.have.status(200);
      expect(res.body.status).to.be.true;
      expect(res.body).to.have.property('token');
    });

    it('should login hospital successfully', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'hospital@test.com',
          password: 'Test@123',
          type: 'hospital'
        });

      expect(res).to.have.status(200);
      expect(res.body.status).to.be.true;
      expect(res.body).to.have.property('token');
    });

    it('should login doctor successfully', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'doctor@test.com',
          password: 'Test@123',
          type: 'doctor'
        });

      expect(res).to.have.status(200);
      expect(res.body.status).to.be.true;
      expect(res.body).to.have.property('token');
    });

    it('should reject login with invalid email format', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'invalid-email',
          password: 'Test@123',
          type: 'patient'
        });

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('Invalid email format!');
    });

    it('should reject login with missing credentials', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'patient@test.com',
          type: 'patient'
        });

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('Email, password, and type are required');
    });

    it('should reject login with wrong password', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'patient@test.com',
          password: 'WrongPassword',
          type: 'patient'
        });

      expect(res).to.have.status(400);
      expect(res.body.status).to.be.false;
      expect(res.body.message).to.equal('Invalid password. Try again.');
    });

    it('should handle JWT sign error', async () => {
      const originalSign = jwt.sign;
      jwt.sign = () => { throw new Error('JWT Error'); };

      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'patient@test.com',
          password: 'Test@123',
          type: 'patient'
        });

      expect(res).to.have.status(500);
      expect(res.body.message).to.equal('Login failed, sorry.');

      jwt.sign = originalSign;
    });

    it('should handle database error', async () => {
      const originalFindOne = Patient.findOne;
      Patient.findOne = () => { throw new Error('Database Error'); };

      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'patient@test.com',
          password: 'Test@123',
          type: 'patient'
        });

      expect(res).to.have.status(500);
      expect(res.body.message).to.equal('Login failed, sorry.');

      Patient.findOne = originalFindOne;
    });

    it('should reject login with invalid user type', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'patient@test.com',
          password: 'Test@123',
          type: 'invalid_type'
        });

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('Invalid user type');
    });

    it('should reject login for non-existent patient', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent.patient@test.com',
          password: 'Test@123',
          type: 'patient'
        });

      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('User account does not exist, you might consider registering');
    });

    it('should reject login for non-existent hospital', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent.hospital@test.com',
          password: 'Test@123',
          type: 'hospital'
        });

      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('User account does not exist, you might consider registering');
    });

    it('should reject login for non-existent doctor', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent.doctor@test.com',
          password: 'Test@123',
          type: 'doctor'
        });

      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('User account does not exist, you might consider registering');
    });
  });
});