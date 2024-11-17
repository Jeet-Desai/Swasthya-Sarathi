import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

const DoctorRequests = () => {
  const doctors = [
    { id: 1, title: 'Doctor Request 1' },
    { id: 2, title: 'Doctor Request 2' },
    { id: 3, title: 'Doctor Request 3' },
    { id: 4, title: 'Doctor Request 4' },
  ];

  return (
    <div>
      {doctors.map((doctor) => (
        <Card
          key={doctor.id}
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
          {/* Left side: Doctor request title */}
          <Typography variant="h6" sx={{ paddingLeft: 2 }}>
            {doctor.title}
          </Typography>

          {/* Right side: Approve and Discard buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ marginLeft: 'auto', alignItems: 'center' }} // Ensures buttons are aligned to the right and vertically centered
          >
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
              }}
            >
              Approve
            </Button>
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
              }}
            >
              Discard
            </Button>
          </Stack>
        </Card>
      ))}
    </div>
  );
};

export default DoctorRequests;
