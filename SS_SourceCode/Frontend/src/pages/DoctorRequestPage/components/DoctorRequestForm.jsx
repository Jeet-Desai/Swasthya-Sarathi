import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';

const DoctorRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    ailment: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: '',
      contactNo: '',
      ailment: '',
      description: '',
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact No."
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Ailment"
          name="ailment"
          value={formData.ailment}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
      <Button
  variant="contained"
  color="primary"
  fullWidth
  onClick={handleSubmit}
  sx={{
    maxWidth: 200, // Set the max width to 200px
    width: '100%', // Ensures it takes full width but is limited by maxWidth
  }}
>
  Submit
</Button>
      </Grid>
    </Grid>
  );
};

export default DoctorRequestForm;