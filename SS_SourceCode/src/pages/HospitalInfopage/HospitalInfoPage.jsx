import React, { useState, useEffect } from 'react';
import HospitalInfoHeader from './HospitalInfoHeader';
import HospitalInfoForm from './HospitalInfoForm';

import axios from 'axios';
import HospitalInfoFooter from './HospitalInfoFooter';

const HospitalInfoPage = () => {
  const [hospitalInfo, setHospitalInfo] = useState({
    hospitalEmail: '',
    hospitalName: '',
    hospitalAddress: '',
    registrationNo: '',
    typeOfOwnership: '',
    contactNo: '',
    departmentsAvailable: '',
    websiteLinks: '',
  });
  

//   useEffect(() => {
//     fetchHospitalInfo();
//   }, []);

  const fetchHospitalInfo = async () => {
    try {
      const response = await axios.get('/api/hospital-info');
      setHospitalInfo(response.data);
    } catch (error) {
      console.error('Error fetching hospital info:', error);
    }
  };

  const updateHospitalInfo = async () => {
    try {
      await axios.put('/api/hospital-info', hospitalInfo);
      fetchHospitalInfo();
    } catch (error) {
      console.error('Error updating hospital info:', error);
    }
  };

  const handleChange = (e) => {
    setHospitalInfo({ ...hospitalInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <HospitalInfoHeader />
      <HospitalInfoForm hospitalInfo={hospitalInfo} onChange={handleChange} onSubmit={updateHospitalInfo} />
      <HospitalInfoFooter />
    </div>
  );
};

export default HospitalInfoPage;
