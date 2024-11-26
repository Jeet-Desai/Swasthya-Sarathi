import { useState, useEffect } from 'react';

export const getHospitalAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Get hospital ID from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        const hospitalId = user?._id;
        // console.log(hospitalId);
        if (!hospitalId) {
          throw new Error('Hospital ID not found');
        }

        const response = await fetch(`http://localhost:5000/api/v1/hospitals/get-hospital-appointments/${hospitalId}`);
        
        const data = await response.json();
        if (response.ok) {
          setAppointments(data.appointments);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching   :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return { appointments, loading, error };
};