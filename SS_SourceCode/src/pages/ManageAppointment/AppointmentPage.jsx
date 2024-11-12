import React from 'react';
import { Box, Button, Typography, Grid, Container } from '@mui/material';

const AppointmentPage = ({ date, time, email }) => {
  // Handlers for buttons
  const handleConfirm = () => {
    alert('Appointment Confirmed!');
  };

  const handleReject = () => {
    alert('Appointment Rejected!');
  };

  return (
    <Box
      sx={{
        height: '100vh', // Full height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          width: '100%',
          maxWidth: 600, // Set a reasonable maximum width for the card
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Appointment Details
        </Typography>

        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="body1" fontWeight="bold">
              Date:
            </Typography>
            <Typography variant="body2">{date}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" fontWeight="bold">
              Time:
            </Typography>
            <Typography variant="body2">{time}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" fontWeight="bold">
              Doctor's Email:
            </Typography>
            <Typography variant="body2">{email}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={3}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              sx={{
                height: '50px', // Equal height for both buttons
                fontSize: '14px',
                borderRadius: 4,
              }}
            >
              Confirm Appointment
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleReject}
              sx={{
                height: '50px', // Equal height for both buttons
                fontSize: '14px',
                borderRadius: 4,
              }}
            >
              Reject Appointment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AppointmentPage;
