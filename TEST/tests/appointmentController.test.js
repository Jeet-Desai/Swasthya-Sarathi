import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index.js';
import Patient from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/PatientModel.js';
import Doctor from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/DoctorModel.js';
import Hospital from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/HospitalModel.js';
import Appointment from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/AppointmentModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import multer from 'multer';
import path from 'path';

const { expect } = chai;
chai.use(chaiHttp);

process.env.JWT_SEC = 'G31_SS';

// Mock multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/test');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

describe('Appointment Controller Tests', () => {
    let mongod;
    let patient, doctor, hospital, appointment;
    let authToken;

    before(async () => {
        try {
            // Create an instance of MongoMemoryServer
            mongod = await MongoMemoryServer.create();
            const mongoUri = mongod.getUri();
            
            // Connect to the in-memory database
            await mongoose.connect(mongoUri);
            console.log('Connected to in-memory database');
        } catch (error) {
            console.error('Error connecting to in-memory database:', error);
            throw error;
        }
    });

    after(async () => {
        try {
            // Disconnect and stop the in-memory database
            await mongoose.disconnect();
            await mongod.stop();
            console.log('Disconnected from in-memory database');
        } catch (error) {
            console.error('Error disconnecting from in-memory database:', error);
            throw error;
        }
    });

    beforeEach(async () => {
        try {
            // Clear all collections
            await Promise.all([
                Patient.deleteMany({}),
                Doctor.deleteMany({}),
                Hospital.deleteMany({}),
                Appointment.deleteMany({})
            ]);

            // Create test data
            doctor = await Doctor.create({
                name: 'Test Doctor',
                email: 'doctor@test.com',
                password: 'password123',
                phone: '1234567890',
                gender: 'Male',
                specialization: 'General Medicine',
                qualification: 'MBBS, MD',
                experience: '5 years',
                about: 'Experienced doctor with good track record',
                dob: new Date('1990-01-01'),
                nationality: 'Indian',
                photo: 'default.jpg'
            });

            // Generate auth token after creating doctor
            authToken = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SEC);

            patient = await Patient.create({
                name: 'Test Patient',
                email: 'patient@test.com',
                password: 'password123',
                nationality: 'Indian',
                dob: new Date('1995-01-01'),
                gender: 'Male',
                bloodGroup: 'O+',
                contactNo: '9876543210',
                role: 'patient'
            });

            hospital = await Hospital.create({
                name: 'Test Hospital',
                email: 'hospital@test.com',
                password: 'password123',
                contactNo: '1234567890',
                dof: new Date('1980-01-01'),
                type: 'Private',
                registration_no: 'HOSP123',
                role: 'hospital'
            });

            appointment = await Appointment.create({
                patient: patient._id,
                doctor: doctor._id,
                hospital: hospital._id,
                date: new Date(),
                time: '10:00',
                status: 'pending',
                description: 'Test appointment'
            });

            console.log('Test data created successfully');
        } catch (error) {
            console.error('Error in beforeEach hook:', error);
            throw error;
        }
    });

    afterEach(async () => {
        try {
            await Doctor.deleteMany({});
            await Patient.deleteMany({});
            await Hospital.deleteMany({});
            await Appointment.deleteMany({});
            console.log('Test data cleaned up successfully');
        } catch (error) {
            console.error('Error in afterEach hook:', error);
            throw error;
        }
    });

    after(async () => {
        try {
            await mongoose.disconnect();
            await mongod.stop();
            console.log('Disconnected from in-memory database');
        } catch (error) {
            console.error('Error in after hook:', error);
            throw error;
        }
    });

    describe('requestAppointment', () => {
        it('should create appointment successfully', async () => {
            const appointmentData = {
                patientId: patient._id,
                doctorId: doctor._id,
                hospitalId: hospital._id,
                date: new Date(),
                time: '14:00',
                description: 'New test appointment'
            };

            const res = await chai.request(app)
                .post('/api/v1/appointments/request')
                .send(appointmentData);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.message).to.equal('Appointment requested successfully');
        });

        it('should handle database error during save', async () => {
            const saveStub = sinon.stub(Appointment.prototype, 'save').throws(new Error('Database error'));
            
            const appointmentData = {
                patientId: patient._id,
                doctorId: doctor._id,
                hospitalId: hospital._id,
                date: new Date(),
                time: '14:00',
                description: 'Test appointment'
            };

            const res = await chai.request(app)
                .post('/api/v1/appointments/request')
                .send(appointmentData);

            saveStub.restore();
            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
        });
    });

    describe('updateAppointment', () => {
        it('should update appointment successfully', async () => {
            const updateData = {
                status: 'completed',
                prescription: 'Test prescription',
                medicines: ['Medicine 1'],
                doctorId: doctor._id.toString()
            };

            const res = await chai.request(app)
                .put(`/api/v1/appointments/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
        });

        it('should handle non-existent appointment', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            
            const res = await chai.request(app)
                .put(`/api/v1/appointments/${fakeId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ doctorId: doctor._id });

            expect(res).to.have.status(404);
            expect(res.body.success).to.be.false;
        });

        it('should handle unauthorized doctor', async () => {
            const updateData = {
                doctorId: new mongoose.Types.ObjectId(), // Different doctor ID
                status: 'completed'
            };

            const res = await chai.request(app)
                .put(`/api/v1/appointments/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData);

            expect(res).to.have.status(403);
            expect(res.body.success).to.be.false;
        });

        it('should handle multiple file uploads and update reports array', async () => {
            try {
                // Create a test file buffer
                const fileBuffer = Buffer.from('test file content');
                
                // Ensure appointment exists and has the correct doctor
                appointment.doctor = doctor._id;
                await appointment.save();

                const res = await chai.request(app)
                    .put(`/api/v1/appointments/${appointment._id}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .field('doctorId', doctor._id.toString())
                    .field('status', 'completed')
                    .attach('reports', fileBuffer, 'test.pdf');

                console.log('Response:', res.body); // For debugging

                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                expect(res.body.appointment.status).to.equal('completed');
                expect(res.body.appointment.reports).to.be.an('array');
            } catch (error) {
                console.error('Test error:', error);
                throw error;
            }
        });

        it('should handle file upload errors', async () => {
            try {
                // Ensure appointment exists and has the correct doctor
                appointment.doctor = doctor._id;
                await appointment.save();

                const res = await chai.request(app)
                    .put(`/api/v1/appointments/${appointment._id}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .field('status', 'completed')
                    .field('doctorId', doctor._id.toString());

                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
            } catch (error) {
                console.error('Test error:', error);
                throw error;
            }
        });

        it('should handle appointment update without files', async () => {
            const updateData = {
                status: 'completed',
                prescription: 'Test prescription',
                medicines: ['Medicine 1'],
                doctorId: doctor._id.toString()
            };

            const res = await chai.request(app)
                .put(`/api/v1/appointments/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointment.reports).to.be.an('array');
            expect(res.body.appointment.reports).to.have.lengthOf(0);
        });

        it('should handle database error during update', async () => {
            const saveStub = sinon.stub(Appointment.prototype, 'save').throws(new Error('Database error'));
            
            const updateData = {
                status: 'completed',
                doctorId: doctor._id.toString()
            };

            const res = await chai.request(app)
                .put(`/api/v1/appointments/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData);

            saveStub.restore();
            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
        });

        it('should handle existing reports when adding new files', async () => {
            // First, create an appointment with existing reports
            appointment.reports = ['existing-report.pdf'];
            await appointment.save();

            const mockFiles = [{
                fieldname: 'reports',
                originalname: 'new-report.pdf',
                encoding: '7bit',
                mimetype: 'application/pdf',
                destination: './uploads/',
                filename: 'new-report.pdf',
                path: 'uploads/new-report.pdf',
                size: 12345
            }];

            const updateData = {
                status: 'completed',
                prescription: 'Test prescription',
                medicines: ['Medicine 1'],
                doctorId: doctor._id.toString()
            };

            const res = await chai.request(app)
                .put(`/api/v1/appointments/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .field('status', updateData.status)
                .field('prescription', updateData.prescription)
                .field('medicines', updateData.medicines)
                .field('doctorId', updateData.doctorId)
                .attach('reports', Buffer.from('mock pdf content'), mockFiles[0].originalname);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointment.reports).to.be.an('array');
            expect(res.body.appointment.reports).to.have.lengthOf(2);
            expect(res.body.appointment.reports).to.include('existing-report.pdf');
            expect(res.body.appointment.reports[1]).to.include('new-report.pdf');
        });

        it('should handle empty files array in request', async () => {
            // Create a request with empty files array
            const updateData = {
                status: 'completed',
                prescription: 'Test prescription',
                medicines: ['Medicine 1'],
                doctorId: doctor._id.toString()
            };

            // Mock the req.files to be an empty array
            const originalMiddleware = app._router.stack.find(layer => layer.handle.name === 'multer');
            const originalIndex = app._router.stack.indexOf(originalMiddleware);
            
            app._router.stack[originalIndex].handle = (req, res, next) => {
                req.files = [];  // Set files to empty array
                next();
            };

            const res = await chai.request(app)
                .put(`/api/v1/appointments/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .field('status', updateData.status)
                .field('prescription', updateData.prescription)
                .field('medicines', updateData.medicines)
                .field('doctorId', updateData.doctorId);

            // Restore original middleware
            app._router.stack[originalIndex].handle = originalMiddleware.handle;

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointment.reports).to.be.an('array');
            expect(res.body.appointment.reports).to.have.lengthOf(0);
        });
    });

    describe('getPendingAppointments', () => {
        it('should get pending appointments successfully', async () => {
            const res = await chai.request(app)
                .get(`/api/v1/appointments/pending/${patient._id}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointments).to.be.an('array');
        });

        it('should handle database error', async () => {
            const findStub = sinon.stub(Appointment, 'find').throws(new Error('Database error'));

            const res = await chai.request(app)
                .get(`/api/v1/appointments/pending/${patient._id}`);

            findStub.restore();
            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
        });
    });

    describe('getAppointmentStats', () => {
        it('should get appointment statistics successfully', async () => {
            const res = await chai.request(app)
                .get(`/api/v1/appointments/stats/${patient._id}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.stats).to.have.all.keys(['total', 'pending', 'completed', 'rejected', 'approved']);
        });

        it('should handle database error', async () => {
            const countStub = sinon.stub(Appointment, 'countDocuments').throws(new Error('Database error'));

            const res = await chai.request(app)
                .get(`/api/v1/appointments/stats/${patient._id}`);

            countStub.restore();
            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
        });
    });

    describe('getHospitalAppointments', () => {
        it('should get hospital appointments successfully', async () => {
            const res = await chai.request(app)
                .get(`/api/v1/appointments/hospital/${hospital._id}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointments).to.be.an('array');
        });

        it('should handle database error', async () => {
            const findStub = sinon.stub(Appointment, 'find').throws(new Error('Database error'));

            const res = await chai.request(app)
                .get(`/api/v1/appointments/hospital/${hospital._id}`);

            findStub.restore();
            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
        });
    });

    describe('updateAppointmentStatus', () => {
        it('should update status successfully', async () => {
            const updateData = { 
                status: 'completed'
            };

            const res = await chai.request(app)
                .put(`/api/v1/appointments/status/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointment.status).to.equal('completed');
        });

        it('should handle non-existent appointment', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            
            const res = await chai.request(app)
                .put(`/api/v1/appointments/status/${fakeId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ status: 'completed' });

            expect(res).to.have.status(404);
            expect(res.body.success).to.be.false;
        });

        it('should handle database error during status update', async () => {
            const saveStub = sinon.stub(Appointment.prototype, 'save').throws(new Error('Database error'));
            
            const res = await chai.request(app)
                .put(`/api/v1/appointments/status/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ status: 'completed' });

            saveStub.restore();
            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('Failed to update appointment status');
        });

        it('should handle invalid appointment ID format', async () => {
            const res = await chai.request(app)
                .put('/api/v1/appointments/status/invalid-id')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ status: 'completed' });

            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
        });
    });

    describe('getPastAppointments', () => {
        it('should get past appointments successfully', async () => {
            const res = await chai.request(app)
                .get(`/api/v1/appointments/past/${patient._id}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointments).to.be.an('array');
        });

        it('should handle database error', async () => {
            const findStub = sinon.stub(Appointment, 'find').throws(new Error('Database error'));

            const res = await chai.request(app)
                .get(`/api/v1/appointments/past/${patient._id}`);

            findStub.restore();
            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
        });
    });
});