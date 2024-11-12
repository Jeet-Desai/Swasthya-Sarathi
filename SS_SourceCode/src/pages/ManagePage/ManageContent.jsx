import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

const ManageContent = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        {/* Appointment Requests Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: '#4CE3FA',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9,
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s, opacity 0.2s',
              padding: 2,
              height: '300px', // Fixed height for all cards
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Center content vertically
            }}
            onClick={() => navigate('/appointments')}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center', // Center content vertically
                justifyContent: 'center', // Center content horizontally
                height: '100%', // Full height for vertical centering
              }}
            >
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Appointment Requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Doctor Requests Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: '#4CE3FA',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9,
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s, opacity 0.2s',
              padding: 2,
              height: '300px', // Fixed height for all cards
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Center content vertically
            }}
            onClick={() => navigate('/doctor-requests')}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center', // Center content vertically
                justifyContent: 'center', // Center content horizontally
                height: '100%', // Full height for vertical centering
              }}
            >
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Doctor Requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Hospital Information Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: '#4CE3FA',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9,
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s, opacity 0.2s',
              padding: 2,
              height: '300px', // Fixed height for all cards
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Center content vertically
            }}
            onClick={() => navigate('/edit-hospital-info')}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center', // Center content vertically
                justifyContent: 'center', // Center content horizontally
                height: '100%', // Full height for vertical centering
              }}
            >
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Edit Hospital Information
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManageContent;
