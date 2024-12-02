import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import Hospital from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/HospitalModel.js';
import Doctor from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/DoctorModel.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { expect } = chai;
chai.use(chaiHttp);

let mongoServer;

// Generate a valid token for testing
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SEC, { expiresIn: '1h' });
};

describe('Hospital Controller Tests', () => {
  let token;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Hospital.deleteMany({});
    await Doctor.deleteMany({});

    // Create a valid token for a doctor
    token = generateToken('someUserId', 'hospital');
  });

  describe('RegisterDoctor', () => {
    let hospital;

    beforeEach(async () => {
      hospital = new Hospital({
        name: 'Test Hospital',
        email: 'hospital@test.com',
        password: 'password123',
        contactNo: '1234567890',
        dof: new Date(),
        type: 'Private',
        registration_no: 'REG123',
        doctors: []
      });
      await hospital.save();
    });

    it('should register a new doctor successfully', async () => {
      const doctorData = {
        email: 'doctor@test.com',
        name: 'Test Doctor',
        password: 'password123',
        confirmPassword: 'password123',
        phone: '9876543210',
        gender: 'Male',
        specialization: 'Cardiology',
        qualification: 'MD',
        experience: '5',
        about: 'Test Doctor Bio',
        dob: '1980-01-01',
        nationality: 'Indian',
        hospitalId: hospital._id
      };

      const res = await chai.request(app)
        .post('/api/v1/hospitals/register-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send(doctorData);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.message).to.equal('Doctor registered successfully and added to hospital');
      expect(res.body.doctor).to.have.property('email', doctorData.email);

      // Verify hospital's doctors array is updated
      const updatedHospital = await Hospital.findById(hospital._id);
      expect(updatedHospital.doctors).to.have.lengthOf(1);
    });

    it('should return error if passwords do not match', async () => {
      const res = await chai.request(app)
        .post('/api/v1/hospitals/register-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'doctor@test.com',
          password: 'password123',
          confirmPassword: 'password456',
          hospitalId: hospital._id
        });

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('Passwords do not match!');
    });

    it('should return error if hospital not found', async () => {
      const res = await chai.request(app)
        .post('/api/v1/hospitals/register-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'doctor@test.com',
          password: 'password123',
          confirmPassword: 'password123',
          hospitalId: new mongoose.Types.ObjectId()
        });

      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('Hospital not found');
    });

    it('should return error if doctor already exists', async () => {
      const existingDoctor = new Doctor({
        email: 'doctor@test.com',
        name: 'Existing Doctor',
        password: 'password123',
        phone: '9876543210',
        gender: 'Male',
        specialization: 'Cardiology',
        qualification: 'MD',
        experience: '5',
        about: 'Test Doctor Bio',
        dob: new Date('1980-01-01'),
        nationality: 'Indian',
        hospital: hospital._id
      });
      await existingDoctor.save();

      const res = await chai.request(app)
        .post('/api/v1/hospitals/register-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'doctor@test.com',
          password: 'password123',
          confirmPassword: 'password123',
          hospitalId: hospital._id
        });

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('Doctor with this email already exists!');
    });

    it('should handle server error during registration', async () => {
      // Mock Doctor.save to throw an error
      const originalSave = Doctor.prototype.save;
      Doctor.prototype.save = () => Promise.reject(new Error('Database error'));

      const res = await chai.request(app)
        .post('/api/v1/hospitals/register-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'doctor@test.com',
          name: 'Test Doctor',
          password: 'password123',
          confirmPassword: 'password123',
          hospitalId: hospital._id
        });

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Server Error');

      // Restore original save function
      Doctor.prototype.save = originalSave;
    });

    it('should handle missing required fields', async () => {
      const hospital = new Hospital({
        name: 'Test Hospital',
        email: `hospital_${Date.now()}@test.com`,
        password: 'password123',
        contactNo: '1234567890',
        dof: new Date(),
        type: 'Private',
        registration_no: 'REG123'
      });
      await hospital.save();

      const res = await chai.request(app)
        .post('/api/v1/hospitals/register-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: `doctor_${Date.now()}@test.com`,
          password: 'password123',
          confirmPassword: 'password123',
          hospitalId: hospital._id
          // Intentionally missing other required fields like name, phone, etc.
        });

      expect(res).to.have.status(500);
      expect(res.body).to.have.property('success', false);
      expect(res.body).to.have.property('message', 'Server Error');
    });

    it('should handle invalid hospital ID format', async () => {
      const res = await chai.request(app)
        .post('/api/v1/hospitals/register-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'doctor@test.com',
          password: 'password123',
          confirmPassword: 'password123',
          hospitalId: 'invalid-id'
        });

      expect(res).to.have.status(500);
      expect(res.body.message).to.equal('Server Error');
    });
  });

  describe('UpdateDoctor', () => {
    let hospital, doctor, newHospital;

    beforeEach(async () => {
      // Create initial hospital
      hospital = new Hospital({
        name: 'Test Hospital',
        email: 'hospital@test.com',
        password: 'password123',
        contactNo: '1234567890',
        dof: new Date(),
        type: 'Private',
        registration_no: 'REG123',
        doctors: []
      });
      await hospital.save();

      // Create initial doctor
      doctor = new Doctor({
        email: 'doctor@test.com',
        name: 'Test Doctor',
        password: await bcrypt.hash('password123', 10),
        phone: '9876543210',
        gender: 'Male',
        specialization: 'Cardiology',
        qualification: 'MD',
        experience: '5',
        about: 'Test Doctor Bio',
        dob: new Date('1980-01-01'),
        nationality: 'Indian',
        hospital: hospital._id
      });
      await doctor.save();

      // Add doctor to hospital
      hospital.doctors.push(doctor._id);
      await hospital.save();

      // Create new hospital for transfer tests
      newHospital = new Hospital({
        name: 'New Hospital',
        email: 'newhospital@test.com',
        password: 'password123',
        contactNo: '0987654321',
        dof: new Date(),
        type: 'Private',
        registration_no: 'REG456',
        doctors: []
      });
      await newHospital.save();
    });

    it('should update all doctor fields successfully', async () => {
      const updateData = {
        doctorId: doctor._id,
        hospitalId: hospital._id,
        name: 'Updated Doctor Name',
        email: 'updated.doctor@test.com',
        phone: '1234567890',
        gender: 'Female',
        specialization: 'Neurology',
        qualification: 'MBBS, MD',
        experience: '10',
        about: 'Updated Bio',
        dob: '1985-01-01',
        nationality: 'American'
      };

      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.message).to.equal('Doctor updated successfully');
      expect(res.body.doctor).to.include({
        name: updateData.name,
        email: updateData.email,
        phone: updateData.phone,
        gender: updateData.gender,
        specialization: updateData.specialization,
        qualification: updateData.qualification,
        experience: updateData.experience,
        about: updateData.about,
        nationality: updateData.nationality
      });
    });

    it('should update partial doctor fields successfully', async () => {
      const updateData = {
        doctorId: doctor._id,
        hospitalId: hospital._id,
        name: 'Updated Doctor Name',
        phone: '1234567890'
      };

      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.doctor.name).to.equal(updateData.name);
      expect(res.body.doctor.phone).to.equal(updateData.phone);
      // Other fields should remain unchanged
      expect(res.body.doctor.email).to.equal(doctor.email);
    });

    it('should handle hospital transfer successfully', async () => {
      const updateData = {
        doctorId: doctor._id,
        hospitalId: newHospital._id,
        name: 'Transferred Doctor'
      };

      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;

      // Verify old hospital's doctors array
      const updatedOldHospital = await Hospital.findById(hospital._id);
      expect(updatedOldHospital.doctors).to.not.include(doctor._id);

      // Verify new hospital's doctors array
      const updatedNewHospital = await Hospital.findById(newHospital._id);
      expect(updatedNewHospital.doctors).to.include(doctor._id);

      // Verify doctor's hospital reference
      const updatedDoctor = await Doctor.findById(doctor._id);
      expect(updatedDoctor.hospital.toString()).to.equal(newHospital._id.toString());
    });

    it('should handle transfer to same hospital (no change)', async () => {
      const updateData = {
        doctorId: doctor._id,
        hospitalId: hospital._id,
        name: 'Updated Name'
      };

      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;

      // Verify hospital's doctors array remains unchanged
      const updatedHospital = await Hospital.findById(hospital._id);
      expect(updatedHospital.doctors).to.include(doctor._id);
    });

    it('should return error if doctor not found', async () => {
      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          doctorId: new mongoose.Types.ObjectId(),
          hospitalId: hospital._id,
          name: 'New Name'
        });

      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('Doctor not found');
    });

    it('should return error if hospital not found', async () => {
      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          doctorId: doctor._id,
          hospitalId: new mongoose.Types.ObjectId(),
          name: 'New Name'
        });

      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('Hospital not found');
    });

    it('should handle error when old hospital not found during transfer', async () => {
      // Manually remove doctor's current hospital
      await Hospital.findByIdAndDelete(hospital._id);

      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          doctorId: doctor._id,
          hospitalId: newHospital._id,
          name: 'New Name'
        });

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Server Error');
    });

    it('should handle database error during update', async () => {
      const originalFindByIdAndUpdate = Doctor.findByIdAndUpdate;
      Doctor.findByIdAndUpdate = () => Promise.reject(new Error('Database error'));

      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          doctorId: doctor._id,
          hospitalId: hospital._id,
          name: 'New Name'
        });

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Server Error');

      // Restore original function
      Doctor.findByIdAndUpdate = originalFindByIdAndUpdate;
    });

    it('should handle invalid doctor ID format', async () => {
      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          doctorId: 'invalid-id',
          hospitalId: hospital._id,
          name: 'New Name'
        });

      expect(res).to.have.status(500);
      expect(res.body.message).to.equal('Server Error');
    });

    it('should handle missing fields during update', async () => {
      const hospital = new Hospital({
        name: 'Test Hospital',
        email: `hospital_${Date.now()}@test.com`,
        password: 'password123',
        contactNo: '1234567890',
        dof: new Date(),
        type: 'Private',
        registration_no: 'REG123'
      });
      await hospital.save();

      const doctor = new Doctor({
        email: `doctor_${Date.now()}@test.com`,
        name: 'Test Doctor',
        password: 'password123',
        phone: '9876543210',
        gender: 'Male',
        specialization: 'Cardiology',
        qualification: 'MD',
        experience: '5',
        about: 'Test Doctor Bio',
        dob: new Date('1980-01-01'),
        nationality: 'Indian',
        hospital: hospital._id
      });
      await doctor.save();

      const res = await chai.request(app)
        .post('/api/v1/hospitals/update-doctor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          doctorId: doctor._id,
          hospitalId: hospital._id
          // Missing all update fields
        });

      expect(res).to.have.status(500); // Changed to match your error handling
      expect(res.body).to.have.property('success', false);
      expect(res.body).to.have.property('message', 'Server Error');
    });
  });

  describe('DeleteDoctor', () => {
    let hospital, doctor;

    beforeEach(async () => {
      hospital = new Hospital({
        name: 'Test Hospital',
        email: 'hospital@test.com',
        password: 'password123',
        contactNo: '1234567890',
        dof: new Date(),
        type: 'Private',
        registration_no: 'REG123',
        doctors: []
      });
      await hospital.save();

      doctor = new Doctor({
        email: 'doctor@test.com',
        name: 'Test Doctor',
        password: await bcrypt.hash('password123', 10),
        phone: '9876543210',
        gender: 'Male',
        specialization: 'Cardiology',
        qualification: 'MD',
        experience: '5',
        about: 'Test Doctor Bio',
        dob: new Date('1980-01-01'),
        nationality: 'Indian',
        hospital: hospital._id
      });
      await doctor.save();

      hospital.doctors.push(doctor._id);
      await hospital.save();
    });

    it('should delete doctor successfully', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/hospitals/delete-doctor/${doctor._id}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.be.true;
      expect(res.body.message).to.equal('Doctor deleted successfully');
      expect(res.body.doctorId).to.equal(doctor._id.toString());

      // Verify doctor is deleted
      const deletedDoctor = await Doctor.findById(doctor._id);
      expect(deletedDoctor).to.be.null;

      // Verify hospital's doctors array is updated
      const updatedHospital = await Hospital.findById(hospital._id);
      expect(updatedHospital.doctors).to.not.include(doctor._id);
    });

    it('should return error if doctor not found', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/hospitals/delete-doctor/${new mongoose.Types.ObjectId()}`);

      expect(res).to.have.status(404);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Doctor not found');
    });

    it('should handle server error during deletion', async () => {
      // Mock findByIdAndDelete to throw an error
      const originalFindByIdAndDelete = Doctor.findByIdAndDelete;
      Doctor.findByIdAndDelete = () => Promise.reject(new Error('Database error'));

      const res = await chai.request(app)
        .delete(`/api/v1/hospitals/delete-doctor/${doctor._id}`);

      expect(res).to.have.status(500);
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.equal('Server error');

      // Restore original function
      Doctor.findByIdAndDelete = originalFindByIdAndDelete;
    });

    it('should handle invalid doctor ID format', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/hospitals/delete-doctor/invalid-id');

      expect(res).to.have.status(500);
      expect(res.body.message).to.equal('Server error');
    });
  });
}); 