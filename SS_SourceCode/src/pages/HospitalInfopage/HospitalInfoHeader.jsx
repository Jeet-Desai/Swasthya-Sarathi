import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const HospitalInfoHeader = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#03AED2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Hospital Information
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HospitalInfoHeader;
