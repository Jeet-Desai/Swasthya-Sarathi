import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../Swasthya-Sarathi/TEST/index.js';
import Doctor from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/DoctorModel.js';
import Hospital from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/HospitalModel.js';
import mongoose from 'mongoose';

chai.use(chaiHttp);
const { expect } = chai;

describe('User Controller Tests', () => {
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
      Doctor.deleteMany({}),
      Hospital.deleteMany({})
    ]);
  });

  describe('Get All Doctors', () => {
    it('should fetch all doctors successfully with populated hospital names', async () => {
      const hospital = await Hospital.create({ name: 'Test Hospital' });
      await Doctor.create({ name: 'Test Doctor', hospital: hospital._id });

      const res = await chai.request(app).get('/api/v1/patients/doctors_fetch');

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.doctors).to.be.an('array').that.is.not.empty;
    });

    it('should handle error when fetching doctors', async () => {
      const originalFind = Doctor.find;
      Doctor.find = () => { throw new Error('Database error'); };

      const res = await chai.request(app).get('/api/v1/patients/doctors_fetch');

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Failed to fetch doctors.');

      Doctor.find = originalFind;
    });

    it('should fetch all doctors successfully with populated hospital names', async () => {
      const hospital = await Hospital.create({ name: 'Test Hospital' });

      await Doctor.create([
        { name: 'Doctor One', hospital: hospital._id },
        { name: 'Doctor Two', hospital: hospital._id }
      ]);

      const res = await chai.request(app).get('/api/v1/patients/doctors_fetch');

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.doctors).to.be.an('array').that.has.lengthOf(2);

      res.body.doctors.forEach(doctor => {
        expect(doctor).to.have.property('name');
        expect(doctor).to.have.property('hospital');
        expect(doctor.hospital).to.have.property('name', 'Test Hospital');
      });
    });

    it('should return an empty array when no doctors exist', async () => {
      const res = await chai.request(app).get('/api/v1/patients/doctors_fetch');

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.doctors).to.be.an('array').that.is.empty;
    });

    it('should handle database error when fetching doctors', async () => {
      const originalFind = Doctor.find;
      Doctor.find = () => { throw new Error('Database connection failed'); };

      const res = await chai.request(app).get('/api/v1/patients/doctors_fetch');

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Failed to fetch doctors.');
      expect(res.body.error).to.equal('Database connection failed');

      Doctor.find = originalFind;
    });
  });

  describe('Get Doctor By ID', () => {
    let testHospital;
    let testDoctor;

    beforeEach(async () => {
      // Create test hospital with ALL required fields
      testHospital = await Hospital.create({ 
        name: 'Test Hospital',
        email: 'hospital@test.com',
        password: 'password123',
        contactNo: '1234567890',
        type: 'Private',
        registration_no: 'REG123',
        dof: new Date(), // Date of foundation
        address: 'Test Address',
        city: 'Test City',
        specializedIn: ['General', 'Cardiology'],
        description: 'Test Description'
      });

      // Create test doctor with ALL required fields
      testDoctor = await Doctor.create({ 
        name: 'Test Doctor',
        email: 'doctor@test.com',
        phone: '1234567890',
        password: 'password123',
        gender: 'Male',
        specialization: 'Cardiology',
        qualification: 'MBBS',
        experience: '5 years',
        hospital: testHospital._id,
        fees: 500,
        timing: {
          start: '09:00',
          end: '17:00'
        },
        nationality: 'Indian', // Added required field
        dob: new Date('1980-01-01'), // Added required field
        about: 'Experienced cardiologist' // Added required field
      });
    });

    it('should fetch doctor details successfully with populated hospital', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/patients/view-doctor/${testDoctor._id}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.doctor).to.include({
        name: 'Test Doctor',
        email: 'doctor@test.com',
        phone: '1234567890',
        gender: 'Male',
        specialization: 'Cardiology',
        qualification: 'MBBS',
        experience: '5 years',
        nationality: 'Indian',
        about: 'Experienced cardiologist'
      });
      expect(res.body.doctor.hospital).to.have.property('name', 'Test Hospital');
    });

    it('should return 404 for non-existent doctor ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await chai
        .request(app)
        .get(`/api/v1/patients/view-doctor/${nonExistentId}`);

      expect(res).to.have.status(404);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Doctor not found');
    });

    it('should handle invalid doctor ID format', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/patients/view-doctor/invalid-id');

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Failed to fetch doctor details.');
      expect(res.body.error).to.exist;
    });

    it('should handle database error when fetching doctor', async () => {
      const originalFindById = Doctor.findById;
      Doctor.findById = () => {
        throw new Error('Database connection failed');
      };

      const res = await chai
        .request(app)
        .get(`/api/v1/patients/view-doctor/${testDoctor._id}`);

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Failed to fetch doctor details.');
      expect(res.body.error).to.equal('Database connection failed');

      // Restore original function
      Doctor.findById = originalFindById;
    });

    it('should handle doctor without hospital reference', async () => {
      const doctorWithoutHospital = await Doctor.create({
        name: 'Independent Doctor',
        email: 'independent@test.com',
        phone: '9876543210',
        password: 'password123',
        gender: 'Female',
        specialization: 'Neurology',
        qualification: 'MD',
        experience: '10 years',
        fees: 500,
        timing: {
          start: '09:00',
          end: '17:00'
        },
        nationality: 'Indian',
        dob: new Date('1985-01-01'),
        about: 'Experienced neurologist'
      });

      const res = await chai
        .request(app)
        .get(`/api/v1/patients/view-doctor/${doctorWithoutHospital._id}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.doctor.hospital).to.be.null;
    });
  });

  describe('Get Hospital ID by Doctor ID', () => {
    let testHospital;
    let testDoctor;

    beforeEach(async () => {
      // Clear existing data
      await Promise.all([
        Doctor.deleteMany({}),
        Hospital.deleteMany({})
      ]);

      // Create test hospital with ALL required fields
      testHospital = await Hospital.create({ 
        name: 'Test Hospital',
        email: 'hospital@test.com',
        password: 'password123',
        contactNo: '1234567890',
        type: 'Private',
        registration_no: 'REG123',
        dof: new Date(),
        address: 'Test Address',
        city: 'Test City',
        specializedIn: ['General'],
        description: 'Test Description'
      });

      // Create test doctor with ALL required fields
      testDoctor = await Doctor.create({ 
        name: 'Test Doctor',
        email: 'doctor@test.com',
        phone: '1234567890',
        password: 'password123',
        gender: 'Male',
        specialization: 'Cardiology',
        qualification: 'MBBS',
        experience: '5 years',
        hospital: testHospital._id,
        fees: 500,
        timing: {
          start: '09:00',
          end: '17:00'
        },
        nationality: 'Indian',
        dob: new Date('1980-01-01'),
        about: 'Experienced cardiologist'
      });
    });

    it('should fetch hospital ID successfully', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/patients/hospital-by-id/${testDoctor._id}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.hospitalId.toString()).to.equal(testHospital._id.toString());
    });

    it('should return 404 for non-existent doctor ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await chai
        .request(app)
        .get(`/api/v1/patients/hospital-by-id/${nonExistentId}`);

      expect(res).to.have.status(404);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Doctor not found');
    });

    it('should handle invalid doctor ID format', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/patients/hospital-by-id/invalid-id');

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Failed to fetch hospital details.');
      expect(res.body.error).to.exist;
    });

    it('should handle database error when fetching hospital ID', async () => {
      // Mock findById to simulate database error
      const originalFindById = Doctor.findById;
      Doctor.findById = () => {
        throw new Error('Database connection failed');
      };

      const res = await chai
        .request(app)
        .get(`/api/v1/patients/hospital-by-id/${testDoctor._id}`);

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Failed to fetch hospital details.');
      expect(res.body.error).to.equal('Database connection failed');

      // Restore original function
      Doctor.findById = originalFindById;
    });

    it('should handle doctor without hospital reference', async () => {
      // Create doctor without hospital reference
      const doctorWithoutHospital = await Doctor.create({
        name: 'Independent Doctor',
        email: 'independent@test.com',
        phone: '9876543210',
        password: 'password123',
        gender: 'Female',
        specialization: 'Neurology',
        qualification: 'MD',
        experience: '10 years',
        fees: 500,
        timing: {
          start: '09:00',
          end: '17:00'
        },
        nationality: 'Indian',
        dob: new Date('1985-01-01'),
        about: 'Experienced neurologist'
      });

      const res = await chai
        .request(app)
        .get(`/api/v1/patients/hospital-by-id/${doctorWithoutHospital._id}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.hospitalId).to.be.undefined;
    });

    it('should handle null hospital ID', async () => {
      // Create doctor with null hospital reference
      const doctorWithNullHospital = await Doctor.create({
        name: 'Doctor Null Hospital',
        email: 'doctornull@test.com',
        phone: '9876543210',
        password: 'password123',
        gender: 'Female',
        specialization: 'Neurology',
        qualification: 'MD',
        experience: '10 years',
        fees: 500,
        timing: {
          start: '09:00',
          end: '17:00'
        },
        nationality: 'Indian',
        dob: new Date('1985-01-01'),
        about: 'Experienced neurologist',
        hospital: null
      });

      const res = await chai
        .request(app)
        .get(`/api/v1/patients/hospital-by-id/${doctorWithNullHospital._id}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.hospitalId).to.be.null;
    });
  });
}); 