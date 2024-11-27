import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DoctorImg from '../../assets/images/doct01.jpg';
import "./DoctorsDetails.css";
import SidePanel from "./components/SidePanel";
import { BASE_URL } from "../../config";
const DoctorsDetails = () => {
    const { doctorId } = useParams();
    // console.log(doctorId);
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        // Fetch doctor details from an API or data source
        const fetchDoctorDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/patients/view-doctor/${doctorId}`);
                const data = await response.json();
                // Set the doctor data from the nested structure
                if (data.success && data.doctor) {
                    setDoctor(data.doctor);
                }
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            }
        };

        fetchDoctorDetails();
    }, [doctorId]);
    console.log(doctor);
    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <section className="docdetp-doctor-details">
            <div className="docdetp-doctor-details__container">
                <div className="docdetp-doctor-details__grid">
                    <div className="docdetp-doctor-details__main">
                        <div className="docdetp-doctor-details__header">
                            <figure className="docdetp-doctor-details__image">
                                <img src={DoctorImg} alt="Doctor profile"  
                                    style={{
                                        width: "330px",
                                        height: "330px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}/>
                            </figure>

                            <div className="docdetp-doctor-details__info">
                                <span className="docdetp-doctor-details__specialty">
                                    {doctor.specialization}
                                </span>
                                <h3 className="docdetp-doctor-details__name">Dr. {doctor.name}</h3>
                                <p className="docdetp-doctor-details__description">
                                    {doctor.about}
                                </p>
                            </div>
                        </div>

                        {/* Commented Navigation Section
                        <div className="doctor-details__nav">
                            <button className="doctor-details__nav-button">About</button>
                        </div>
                        */}
                    </div>
                    <div className="docdetp-doctor-details__sidebar">
                        <SidePanel />
                    </div>
                </div>
            </div>
        </section>
    );

};

export default DoctorsDetails;