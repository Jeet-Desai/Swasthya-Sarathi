import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";

const DoctorRequestHeader = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}> {/* Add marginBottom here */}
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Appointment Request</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default DoctorRequestHeader;
