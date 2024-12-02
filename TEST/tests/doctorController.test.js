import chai from 'chai';
import chaiHttp from 'chai-http';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../index.js';
import Doctor from '../Models/DoctorModel.js';
import Patient from '../Models/PatientModel.js';
import Appointment from '../Models/AppointmentModel.js';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';

const { expect } = chai;
chai.use(chaiHttp);

describe('Doctor Controller Tests', () => {
    let mongod;
    let doctor, authToken;
    let testHospital;

    before(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri);

        // Common setup
        doctor = await Doctor.create({
            name: 'Test Doctor',
            email: 'doctor@test.com',
            password: 'password123',
            phone: '1234567890',
            gender: 'Male',
            specialization: 'General Medicine',
            qualification: 'MBBS',
            experience: '5 years',
            about: 'Experienced doctor',
            dob: new Date('1990-01-01'),
            nationality: 'Indian'
        });

        testHospital = new mongoose.Types.ObjectId();

        authToken = jwt.sign(
            { id: doctor._id, role: 'doctor' },
            process.env.JWT_SEC || 'test_secret'
        );
    });

    beforeEach(async () => {
        // Clear collections that change between tests
        await Promise.all([
            Patient.deleteMany({}),
            Appointment.deleteMany({})
        ]);
    });

    describe('updateDoctorProfile', () => {
        it('should update doctor profile successfully', async () => {
            const updateData = {
                name: 'Updated Doctor Name',
                specialization: 'Cardiology'
            };

            const res = await chai.request(app)
                .put(`/api/v1/doctors/${doctor._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.doctor.name).to.equal('Updated Doctor Name');
            expect(res.body.doctor.specialization).to.equal('Cardiology');
        });

        it('should handle non-existent doctor', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const updateData = { name: 'Updated Name' };

            const res = await chai.request(app)
                .put(`/api/v1/doctors/${nonExistentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData);

            expect(res).to.have.status(404);
            expect(res.body.message).to.equal('Doctor not found!');
        });

        it('should handle unauthorized access', async () => {
            const unauthorizedToken = jwt.sign(
                { id: new mongoose.Types.ObjectId(), role: 'doctor' },
                process.env.JWT_SEC || 'test_secret'
            );

            const res = await chai.request(app)
                .put(`/api/v1/doctors/${doctor._id}`)
                .set('Authorization', `Bearer ${unauthorizedToken}`)
                .send({ name: 'Unauthorized Update' });

            expect(res).to.have.status(403);
            expect(res.body.message).to.equal('You are not authorized to update this profile.');
        });

        it('should handle database error during update', async () => {
            const updateData = { name: 'Updated Name' };
            const saveStub = sinon.stub(Doctor.prototype, 'save').throws(new Error('Database error'));

            const res = await chai.request(app)
                .put(`/api/v1/doctors/${doctor._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData);

            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('Failed to update doctor profile.');

            saveStub.restore();
        });

        it('should handle invalid update data', async () => {
            const res = await chai.request(app)
                .put(`/api/v1/doctors/${doctor._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ experience: {} }); // Invalid data type

            expect(res).to.have.status(500);
        });
    });

    describe('updateAppointment', () => {
        it('should update appointment successfully', async () => {
            const testPatient = await Patient.create({
                name: 'Test Patient',
                email: `patient${Date.now()}@test.com`,
                password: 'password123',
                nationality: 'Indian',
                dob: new Date('1995-01-01'),
                gender: 'Male',
                bloodGroup: 'O+',
                contactNo: '9876543210'
            });

            const appointment = await Appointment.create({
                doctor: doctor._id,
                patient: testPatient._id,
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'pending'
            });

            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: 'completed',
                    doctorId: doctor._id.toString()
                });

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointment.status).to.equal('completed');
        });

        it('should handle non-existent appointment', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();

            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${nonExistentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: 'completed',
                    doctorId: doctor._id.toString()
                });

            expect(res).to.have.status(404);
            expect(res.body.message).to.equal('Appointment not found!');
        });

        it('should handle unauthorized doctor', async () => {
            const testPatient = await Patient.create({
                name: 'Test Patient',
                email: `patient${Date.now()}@test.com`,
                password: 'password123',
                nationality: 'Indian',
                dob: new Date('1995-01-01'),
                gender: 'Male',
                bloodGroup: 'O+',
                contactNo: '9876543210'
            });

            const appointment = await Appointment.create({
                doctor: doctor._id,
                patient: testPatient._id,
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'pending'
            });

            const unauthorizedDoctorId = new mongoose.Types.ObjectId();

            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: 'completed',
                    doctorId: unauthorizedDoctorId.toString()
                });

            expect(res).to.have.status(403);
            expect(res.body.message).to.equal('You are not authorized to update this appointment.');
        });

        it('should keep existing fields when not provided in update', async () => {
            const testPatient = await Patient.create({
                name: 'Test Patient',
                email: `patient${Date.now()}@test.com`,
                password: 'password123',
                nationality: 'Indian',
                dob: new Date('1995-01-01'),
                gender: 'Male',
                bloodGroup: 'O+',
                contactNo: '9876543210'
            });

            const initialAppointment = await Appointment.create({
                doctor: doctor._id,
                patient: testPatient._id,
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'pending',
                prescription: 'Initial prescription',
                medicines: ['Medicine 1'],
                reports: ['Report 1']
            });

            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${initialAppointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: 'completed',
                    doctorId: doctor._id.toString()
                });

            expect(res).to.have.status(200);
            expect(res.body.appointment).to.include({
                prescription: 'Initial prescription'
            });
            expect(res.body.appointment.medicines).to.deep.equal(['Medicine 1']);
            expect(res.body.appointment.reports).to.deep.equal(['Report 1']);
        });

        it('should log doctorId during update', async () => {
            const testPatient = await Patient.create({
                name: 'Test Patient',
                email: `patient${Date.now()}@test.com`,
                password: 'password123',
                nationality: 'Indian',
                dob: new Date('1995-01-01'),
                gender: 'Male',
                bloodGroup: 'O+',
                contactNo: '9876543210'
            });

            const appointment = await Appointment.create({
                doctor: doctor._id,
                patient: testPatient._id,
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'pending'
            });

            const consoleLogSpy = sinon.spy(console, 'log');

            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: 'completed',
                    doctorId: doctor._id.toString()
                });

            expect(consoleLogSpy.calledWith(doctor._id.toString())).to.be.true;
            consoleLogSpy.restore();
        });

        it('should handle database error during appointment update', async () => {
            const appointment = await Appointment.create({
                doctor: doctor._id,
                patient: new mongoose.Types.ObjectId(),
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'pending'
            });

            const saveStub = sinon.stub(Appointment.prototype, 'save').throws(new Error('Database error'));

            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: 'completed',
                    doctorId: doctor._id.toString()
                });

            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('Failed to update appointment.');

            saveStub.restore();
        });

        it('should update multiple fields simultaneously', async () => {
            const appointment = await Appointment.create({
                doctor: doctor._id,
                patient: new mongoose.Types.ObjectId(),
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'pending'
            });

            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: 'completed',
                    prescription: 'New prescription',
                    medicines: ['Med1', 'Med2'],
                    reports: ['Report1'],
                    doctorId: doctor._id.toString()
                });

            expect(res).to.have.status(200);
            expect(res.body.appointment.status).to.equal('completed');
            expect(res.body.appointment.prescription).to.equal('New prescription');
            expect(res.body.appointment.medicines).to.deep.equal(['Med1', 'Med2']);
            expect(res.body.appointment.reports).to.deep.equal(['Report1']);
        });

        it('should maintain existing status when status is undefined', async () => {
            // Create appointment with initial status
            const appointment = await Appointment.create({
                doctor: doctor._id,
                patient: new mongoose.Types.ObjectId(),
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'pending'  // Initial status
            });

            // Update appointment without providing status
            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    doctorId: doctor._id.toString(),
                    prescription: 'New prescription'  // Only updating prescription
                });

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointment.status).to.equal('pending');  // Status should remain unchanged
        });

        it('should update status when new status is provided', async () => {
            // Create appointment with initial status
            const appointment = await Appointment.create({
                doctor: doctor._id,
                patient: new mongoose.Types.ObjectId(),
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'pending'  // Initial status
            });

            // Update appointment with new status
            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: 'completed',  // New status
                    doctorId: doctor._id.toString()
                });

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointment.status).to.equal('completed');  // Status should be updated
        });

        it('should handle empty string status', async () => {
            // Create appointment with initial status
            const appointment = await Appointment.create({
                doctor: doctor._id,
                patient: new mongoose.Types.ObjectId(),
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'pending'  // Initial status
            });

            // Update appointment with empty status
            const res = await chai.request(app)
                .post(`/api/v1/doctors/upd_appo/${appointment._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: '',  // Empty status
                    doctorId: doctor._id.toString()
                });

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointment.status).to.equal('pending');  // Status should remain unchanged
        });
    });

    describe('getPendingAppointmentsbyDiD', () => {
        it('should get pending appointments successfully', async () => {
            const testPatient = await Patient.create({
                name: 'Test Patient Success',
                email: `patient${Date.now()}_success@test.com`,
                password: 'password123',
                nationality: 'Indian',
                dob: new Date('1995-01-01'),
                gender: 'Male',
                bloodGroup: 'O+',
                contactNo: '9876543210'
            });

            await Appointment.create({
                doctor: doctor._id,
                patient: testPatient._id,
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'approved',
                description: 'Test appointment'
            });

            const res = await chai.request(app)
                .get(`/api/v1/doctors/get-pending-appo/${doctor._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointments[0].patientName).to.exist;
        });

        it('should handle database errors', async () => {
            // Temporarily disconnect from database to simulate error
            const findStub = sinon.stub(Appointment, 'find').throws(new Error('Database error'));

            const res = await chai.request(app)
                .get(`/api/v1/doctors/get-pending-appo/${doctor._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('Failed to fetch pending appointments');

            findStub.restore();
        });

        // it('should handle appointments with missing patient data', async () => {
        //     await Appointment.create({
        //         doctor: doctor._id,
        //         patient: new mongoose.Types.ObjectId(),
        //         hospital: testHospital,
        //         date: new Date(),
        //         time: '11:00',
        //         status: 'approved',
        //         description: 'Test appointment without patient'
        //     });

        //     const res = await chai.request(app)
        //         .get(`/api/v1/doctors/get-pending-appo/${doctor._id}`)
        //         .set('Authorization', `Bearer ${authToken}`);

        //     expect(res).to.have.status(200);
        //     expect(res.body.success).to.be.true;
        //     const appointmentWithoutPatient = res.body.appointments.find(
        //         app => app.patientName === null
        //     );
        //     expect(appointmentWithoutPatient).to.exist;
        // });

        it('should format appointment data correctly', async () => {
            const testPatient = await Patient.create({
                name: 'Test Patient Format',
                email: `patient${Date.now()}_format@test.com`,
                password: 'password123',
                nationality: 'Indian',
                dob: new Date('1995-01-01'),
                gender: 'Male',
                bloodGroup: 'O+',
                contactNo: '9876543210'
            });

            await Appointment.create({
                doctor: doctor._id,
                patient: testPatient._id,
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'approved',
                description: 'Test appointment'
            });

            const res = await chai.request(app)
                .get(`/api/v1/doctors/get-pending-appo/${doctor._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointments[0]).to.include.all.keys([
                'appointmentId',
                'patientName',
                'date',
                'time',
                'description'
            ]);
        });

        it('should assign entire patient object to patientName', async () => {
            const testPatient = await Patient.create({
                name: 'Test Patient Object',
                email: `patient${Date.now()}_object@test.com`,
                password: 'password123',
                nationality: 'Indian',
                dob: new Date('1995-01-01'),
                gender: 'Male',
                bloodGroup: 'O+',
                contactNo: '9876543210'
            });

            await Appointment.create({
                doctor: doctor._id,
                patient: testPatient._id,
                hospital: testHospital,
                date: new Date(),
                time: '10:00',
                status: 'approved',
                description: 'Test appointment'
            });

            const res = await chai.request(app)
                .get(`/api/v1/doctors/get-pending-appo/${doctor._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            const appointment = res.body.appointments.find(
                app => app.patientName && app.patientName.name === 'Test Patient Object'
            );
            expect(appointment).to.exist;
            expect(appointment.patientName).to.have.property('name');
            expect(appointment.patientName.name).to.equal('Test Patient Object');
        });

        it('should handle appointments without patient data', async () => {
            await Appointment.create({
                doctor: doctor._id,
                patient: new mongoose.Types.ObjectId(),
                hospital: testHospital,
                date: new Date(),
                time: '11:00',
                status: 'approved',
                description: 'Test appointment without patient'
            });

            const res = await chai.request(app)
                .get(`/api/v1/doctors/get-pending-appo/${doctor._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            const appointmentWithoutPatient = res.body.appointments.find(
                app => app.patientName === null
            );
            expect(appointmentWithoutPatient).to.exist;
        });

        it('should return empty array for doctor with no appointments', async () => {
            const newDoctor = await Doctor.create({
                name: 'New Doctor',
                email: 'newdoctor@test.com',
                password: 'password123',
                phone: '9876543210',
                gender: 'Female',
                specialization: 'Pediatrics',
                qualification: 'MD',
                experience: '3 years',
                dob: new Date('1992-01-01'),
                nationality: 'Indian',
                about: 'Experienced pediatrician' 
            });

            const res = await chai.request(app)
                .get(`/api/v1/doctors/get-pending-appo/${newDoctor._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.appointments).to.be.an('array').that.is.empty;
            expect(res.body.count).to.equal(0);
        });

        it('should handle invalid doctor ID format', async () => {
            const res = await chai.request(app)
                .get('/api/v1/doctors/get-pending-appo/invalid-id')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
        });
    });

    after(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });
}); 