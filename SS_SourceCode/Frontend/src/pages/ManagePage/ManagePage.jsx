import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, useTheme } from '@mui/material';
import ManageContent from './ManageContent';
import AppointmentRequests from './AppointmentRequests';
import DoctorRequests from './DoctorRequests';

const ManagePage = () => {
  const theme = useTheme();

  return (
    <Router>
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'white' }}> {/* Set whole page background to white */}
        {/* Fixed AppBar */}
        <AppBar position="fixed" sx={{ bgcolor: '#4CE3FA', top: 0, width: '100%', zIndex: 1201 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ color: 'black', textAlign: 'center' }}>
              Manage Hospital
            </Typography>
          </Toolbar>
        </AppBar>
        
        {/* Main Content with padding-top to avoid overlap */}
        <Container sx={{ mt: 10, bgcolor: 'white' }}> {/* Ensure main content area is also white */}
          <Box sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<ManageContent />} />
              <Route path="/appointments" element={<AppointmentRequests />} />
              <Route path="/doctor-requests" element={<DoctorRequests />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </Router>
  );
};

export default ManagePage;
