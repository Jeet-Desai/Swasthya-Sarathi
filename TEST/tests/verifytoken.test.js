import chai from 'chai';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import { authenticate, restrict } from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/auth/verifyToken.js';
import Patient from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/PatientModel.js';
import Doctor from '../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Models/DoctorModel.js';

const { expect } = chai;

describe('Auth Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {},
            userId: null,
            role: null
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('authenticate', () => {
        it('should return 401 if no authorization header', async () => {
            await authenticate(req, res, next);

            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({
                success: false,
                message: "auth denied"
            })).to.be.true;
        });

        it('should return 401 if token does not start with Bearer', async () => {
            req.headers.authorization = 'InvalidToken';
            
            await authenticate(req, res, next);

            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({
                success: false,
                message: "auth denied"
            })).to.be.true;
        });

        it('should set userId and role for valid token', async () => {
            const token = jwt.sign(
                { id: 'testId', role: 'patient' },
                process.env.JWT_SEC || 'test_secret'
            );
            req.headers.authorization = `Bearer ${token}`;

            await authenticate(req, res, next);

            expect(req.userId).to.equal('testId');
            expect(req.role).to.equal('patient');
            expect(next.called).to.be.true;
        });

        it('should return 401 for expired token', async () => {
            const token = jwt.sign(
                { id: 'testId', role: 'patient' },
                process.env.JWT_SEC || 'test_secret',
                { expiresIn: '-1s' }
            );
            req.headers.authorization = `Bearer ${token}`;

            await authenticate(req, res, next);

            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({
                success: false,
                message: "token expired"
            })).to.be.true;
            expect(next.called).to.be.false;
        });

        it('should return 401 for incorrect token', async () => {
            req.headers.authorization = 'Bearer invalidtoken';

            await authenticate(req, res, next);

            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({
                success: false,
                message: "incorrect Token"
            })).to.be.true;
        });

        it('should return 401 for malformed token', async () => {
            const token = jwt.sign(
                { id: 'testId', role: 'patient' },
                'different_secret'
            );
            
            req.headers.authorization = `Bearer ${token}`;
            
            await authenticate(req, res, next);
            
            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({
                success: false,
                message: "incorrect Token"
            })).to.be.true;
            expect(next.called).to.be.false;
        });
    });

    describe('restrict', () => {
        beforeEach(() => {
            req.userId = 'testUserId';
        });

        it('should handle patient role correctly', async () => {
            const patientStub = sinon.stub(Patient, 'findById').resolves({
                role: 'patient'
            });
            const doctorStub = sinon.stub(Doctor, 'findById').resolves(null);

            const middleware = restrict(['patient']);
            await middleware(req, res, next);

            expect(next.called).to.be.true;
            patientStub.restore();
            doctorStub.restore();
        });

        it('should handle doctor role correctly', async () => {
            const patientStub = sinon.stub(Patient, 'findById').resolves(null);
            const doctorStub = sinon.stub(Doctor, 'findById').resolves({
                role: 'doctor'
            });

            const middleware = restrict(['doctor']);
            await middleware(req, res, next);

            expect(next.called).to.be.true;
            patientStub.restore();
            doctorStub.restore();
        });

        it('should return 401 if user not found', async () => {
            const patientStub = sinon.stub(Patient, 'findById').resolves(null);
            const doctorStub = sinon.stub(Doctor, 'findById').resolves(null);

            const middleware = restrict(['patient']);
            await middleware(req, res, next);

            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith("Not authorized for that stuff")).to.be.true;
            patientStub.restore();
            doctorStub.restore();
        });

        it('should return 401 if user role not in allowed roles', async () => {
            const patientStub = sinon.stub(Patient, 'findById').resolves({
                role: 'patient'
            });
            const doctorStub = sinon.stub(Doctor, 'findById').resolves(null);

            const middleware = restrict(['admin']);
            await middleware(req, res, next);

            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith("Not authorized for that stuff")).to.be.true;
            patientStub.restore();
            doctorStub.restore();
        });

        it('should handle database errors', async () => {
            const error = new Error('Database error');
            const patientStub = sinon.stub(Patient, 'findById').rejects(error);
            const doctorStub = sinon.stub(Doctor, 'findById').rejects(error);

            const middleware = restrict(['patient']);
            await middleware(req, res, next);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                success: false,
                message: "Internal server error"
            })).to.be.true;
            patientStub.restore();
            doctorStub.restore();
        });
    });
});