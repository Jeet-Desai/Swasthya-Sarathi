import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, Paper } from '@mui/material';
import DoctorRequestHeader from './components/DoctorRequestHeader';
import DoctorRequestForm from './components/DoctorRequestForm';
import DoctorRequestList from './components/DoctorRequestList';
import DoctorRequestFooter from './components/DoctorRequestFooter';

const DoctorRequestPage = () => {
  const [doctorRequests, setDoctorRequests] = useState([]);

//   useEffect(() => {
//     fetchDoctorRequests();
//   }, []);

  const fetchDoctorRequests = async () => {
    try {
      const response = await axios.get('/api/doctor-requests');
      setDoctorRequests(response.data);
    } catch (error) {
      console.error('Error fetching doctor requests:', error);
    }
  };

  const createDoctorRequest = async (requestData) => {
    try {
      await axios.post('/api/doctor-requests', requestData);
      fetchDoctorRequests();
    } catch (error) {
      console.error('Error creating doctor request:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Left side - Hospital Image and Name */}
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
            padding: 2,
          }}
        >
          <Paper sx={{ width: '100%', height: '50%', backgroundColor: '#f5f5f5' }}>
            <img
              src="https://via.placeholder.com/400x300.png?text=Hospital+Image"
              alt="Hospital"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Paper>
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            Dummy Hospital Name
          </Typography>
        </Box>
      </Grid>

      {/* Right side - Existing Content (DoctorRequestPage) */}
      <Grid item xs={12} sm={6}>
        <Box sx={{ height: '100vh', overflowY: 'auto' }}>
          <DoctorRequestHeader />
          <DoctorRequestForm onSubmit={createDoctorRequest} />
          <DoctorRequestList doctorRequests={doctorRequests} />
          <DoctorRequestFooter />
        </Box>
      </Grid>
    </Grid>
  );
};

export default DoctorRequestPage;
