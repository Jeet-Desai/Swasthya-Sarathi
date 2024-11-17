import React, { useState } from 'react';
import { 
  Grid, 
  TextField, 
  Button, 
  Snackbar, 
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled('form')(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '', // Light pink background
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const departmentsOptions = [
  "Cardiology", 
  "Neurology", 
  "Oncology", 
  "Orthopedics", 
  "Pediatrics", 
  "Radiology",
  "General Medicine"
];

const HospitalInfoForm = ({ initialHospitalInfo, onSubmit }) => {
  const [hospitalInfo, setHospitalInfo] = useState(initialHospitalInfo || {
    hospitalEmail: '',
    hospitalName: '',
    hospitalAddress: '',
    registrationNo: '',
    typeOfOwnership: '',
    contactNo: '',
    departmentsAvailable: '',
    websiteLinks: ''
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const validateForm = () => {
    const newErrors = {};

    if (!hospitalInfo.hospitalEmail) {
      newErrors.hospitalEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(hospitalInfo.hospitalEmail)) {
      newErrors.hospitalEmail = 'Invalid email format';
    }

    if (!hospitalInfo.hospitalName) {
      newErrors.hospitalName = 'Hospital name is required';
    }

    if (!hospitalInfo.hospitalAddress) {
      newErrors.hospitalAddress = 'Address is required';
    }

    if (!hospitalInfo.registrationNo) {
      newErrors.registrationNo = 'Registration number is required';
    }

    if (!hospitalInfo.contactNo) {
      newErrors.contactNo = 'Contact number is required';
    } else if (!/^\d{10}$/.test(hospitalInfo.contactNo.replace(/\D/g, ''))) {
      newErrors.contactNo = 'Invalid contact number format';
    }

    if (hospitalInfo.websiteLinks && !/^https?:\/\/.*/.test(hospitalInfo.websiteLinks)) {
      newErrors.websiteLinks = 'Invalid website URL format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHospitalInfo(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await onSubmit(hospitalInfo);
        setSnackbar({
          open: true,
          message: 'Hospital information updated successfully!',
          severity: 'success'
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message || 'Failed to update hospital information',
          severity: 'error'
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: 'Please fix the errors before submitting',
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        {/* Form Fields */}
        <Grid item xs={12}>
          <TextField
            label="Hospital Email"
            name="hospitalEmail"
            value={hospitalInfo.hospitalEmail}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.hospitalEmail}
            helperText={errors.hospitalEmail}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Hospital Name"
            name="hospitalName"
            value={hospitalInfo.hospitalName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.hospitalName}
            helperText={errors.hospitalName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Hospital Address"
            name="hospitalAddress"
            value={hospitalInfo.hospitalAddress}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            multiline
            rows={1}
            error={!!errors.hospitalAddress}
            helperText={errors.hospitalAddress}
          />
        </Grid>

        {/* Other Fields */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Registration No."
            name="registrationNo"
            value={hospitalInfo.registrationNo}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.registrationNo}
            helperText={errors.registrationNo}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body1" gutterBottom>
            Verification Documents
          </Typography>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'black' } }}
          >
            Upload
            <input type="file" hidden />
          </Button>
        </Grid>

        {/* Other Fields */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Contact No."
            name="contactNo"
            value={hospitalInfo.contactNo}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.contactNo}
            helperText={errors.contactNo}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Type of Ownership"
            name="typeOfOwnership"
            value={hospitalInfo.typeOfOwnership}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Website Links"
            name="websiteLinks"
            value={hospitalInfo.websiteLinks}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={!!errors.websiteLinks}
            helperText={errors.websiteLinks}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Departments Available</InputLabel>
            <Select
              label="Departments Available"
              name="departmentsAvailable"
              value={hospitalInfo.departmentsAvailable}
              onChange={handleChange}
            >
              {departmentsOptions.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Update Button */}
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: 'black',
              '&:hover': { backgroundColor: 'black' },
              size: 'small'  // Reduce button size
            }}
            type="submit"
          >
            Update Hospital Information
          </Button>
        </Grid>
      </Grid>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default HospitalInfoForm;
