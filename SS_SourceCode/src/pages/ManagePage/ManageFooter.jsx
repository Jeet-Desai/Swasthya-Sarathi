import React from 'react';
import { Typography, Box } from '@mui/material';

const ManageFooter = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" color="textSecondary" align="center">
        &copy; 2023 Your Hospital. All rights reserved.
      </Typography>
    </Box>
  );
};

export default ManageFooter;
