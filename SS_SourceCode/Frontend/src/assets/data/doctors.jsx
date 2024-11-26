import { useState, useEffect } from 'react';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/patients/doctors_fetch');
        const data = await response.json();
        if (response.ok) {
          setDoctors(data.doctors);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return doctors;
};

