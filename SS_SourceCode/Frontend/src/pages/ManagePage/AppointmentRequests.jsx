import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const AppointmentRequests = () => {
  const appointments = [
    { id: 1, title: 'Appointment Request 1' },
    { id: 2, title: 'Appointment Request 2' },
    { id: 3, title: 'Appointment Request 3' },
    { id: 4, title: 'Appointment Request 4' },
  ];

  return (
    <div>
      {appointments.map((appointment) => (
        <Card
          key={appointment.id}
          sx={{
            backgroundColor: '#4CE3FA',
            borderRadius: '28px',
            boxShadow: 3, // Optional: Adds a shadow for better visual appeal
            display: 'flex',
            alignItems: 'center', // Ensures vertical centering of content
            padding: '12px', // Add padding to prevent overcrowding
            marginBottom: 2, // Adds spacing between cards
          }}
        >
          {/* Left side: Appointment title */}
          <Typography variant="h6" sx={{ paddingLeft: 2 }}>
            {appointment.title}
          </Typography>

          {/* Right side: View button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: 'black',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              },
              borderRadius: '20px',
              paddingX: 3, // Horizontal padding
              paddingY: 1, // Vertical padding
              marginLeft: 'auto', // Aligns button to the right
              height: '100%', // Ensures button is vertically centered
              display: 'flex', // Flexbox for button to center vertically
              alignItems: 'center', // Vertically centers button text
            }}
          >
            View
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentRequests;
