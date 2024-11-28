import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DoctorImg from '../../assets/images/doct01.jpg';
import "./DoctorsDetails.css";
import SidePanel from "./components/SidePanel";
import { BASE_URL } from "../../config";

const DoctorsDetails = () => {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/patients/view-doctor/${doctorId}`);
                const data = await response.json();
                console.log(data);
                if (data.success && data.doctor) {
                    setDoctor(data.doctor);
                }
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            }
        };

        fetchDoctorDetails();
    }, [doctorId]);

    if (!doctor) {
        return <div className="docdetp-loading">Loading...</div>;
    }

    return (
        <section className="docdetp-doctor-details">
            <div className="docdetp-doctor-details__container">
                <div className="docdetp-doctor-details__header">
                    <div className="docdetp-doctor-details__image-container">
                        <img src={DoctorImg} alt="Doctor profile" className="docdetp-doctor-details__image" />
                    </div>
                    <div className="docdetp-doctor-details__info">
                        <h1 className="docdetp-doctor-details__name">Dr. {doctor.name}</h1>
                        <span className="docdetp-doctor-details__specialty">{doctor.specialization}</span>
                        <div className="docdetp-doctor-details__stats">
                            <div className="docdetp-doctor-details__stat">
                                <span className="docdetp-doctor-details__stat-value">{doctor.experience}</span>
                                <span className="docdetp-doctor-details__stat-label">Years Experience</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="docdetp-doctor-details__content">
                    <div className="docdetp-doctor-details__tabs">
                        <button 
                            className={`docdetp-doctor-details__tab ${activeTab === 'about' ? 'active' : ''}`}
                            onClick={() => setActiveTab('about')}
                        >
                            About
                        </button>
                        <button 
                            className={`docdetp-doctor-details__tab ${activeTab === 'experience' ? 'active' : ''}`}
                            onClick={() => setActiveTab('experience')}
                        >
                            Experience
                        </button>
                    </div>
                    <div className="docdetp-doctor-details__tab-content">
                        {activeTab === 'about' && (
                            <div className="docdetp-doctor-details__about">
                                <h2>About Dr. {doctor.name}</h2>
                                <p>{doctor.about}</p>
                            </div>
                        )}
                        {activeTab === 'experience' && (
                            <div className="docdetp-doctor-details__experience">
                                <h2>Professional Experience</h2>
                                <p>{doctor.experience} years of experience in {doctor.specialization}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="docdetp-doctor-details__sidebar">
                    <SidePanel />
                </div>
            </div>
        </section>
    );
};

export default DoctorsDetails;