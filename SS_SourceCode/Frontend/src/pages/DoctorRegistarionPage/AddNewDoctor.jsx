import React, { useState, useContext } from "react";
import {
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const theme = createTheme({
  palette: {
    primary: {
      main: "#05cdec",
    },
  },
  typography: {
    h5: {
      fontSize: "1.5rem",
      "@media (max-width:900px)": {
        fontSize: "1.3rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.1rem",
      },
      "@media (max-width:400px)": {
        fontSize: "0.75rem",
      },
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        },
      },
    },
  },
});

const AddNewDoctor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    specialization: "",
    qualification: "",
    experience: "",
    about: "",
    dob: "",
    nationality: "",
  });

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const hospitalId = user ? user._id : null;
    if (!hospitalId) {
      toast.error("Hospital ID not found in local storage.");
      return;
    }

    const doctorData = {
      ...formData,
      hospitalId,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/hospitals/register-doctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Doctor registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          gender: "",
          specialization: "",
          qualification: "",
          experience: "",
          about: "",
          dob: "",
          nationality: "",
        });
        navigate("/homeadmin");
      } else {
        toast.error(data.message || "Failed to register doctor.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #d4d4d8, #e4e4e7, #f4f4f5, #a1a1aa)",
          padding: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: { xs: "90%", sm: "95%", md: "100%" },
            backgroundColor: "white",
            margin: "0",
          }}
        >
          <CardContent
            sx={{
              padding: { xs: "16px", sm: "24px", md: "32px" },
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              align="center"
              sx={{
                mb: { xs: 2, sm: 3, md: 4 },
                fontWeight: "bold",
                color: "#333",
                textTransform: "uppercase",
              }}
            >
              Register New Doctor
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {[
                      { name: "name", label: "Name" },
                      { name: "email", label: "Email", type: "email" },
                      { name: "password", label: "Password", type: "password" },
                      {
                        name: "confirmPassword",
                        label: "Confirm Password",
                        type: "password",
                      },
                      { name: "phone", label: "Phone" },
                      { name: "nationality", label: "Nationality" },
                    ].map((field) => (
                      <TextField
                        key={field.name}
                        required
                        fullWidth
                        name={field.name}
                        label={field.label}
                        type={field.type || "text"}
                        value={formData[field.name]}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormControl fullWidth required>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        label="Gender"
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth required>
                      <InputLabel>Specialization</InputLabel>
                      <Select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        label="Specialization"
                      >
                        {departmentsArray.map((dept) => (
                          <MenuItem key={dept} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {[
                      { name: "qualification", label: "Qualification" },
                      { name: "experience", label: "Experience" },
                      { name: "dob", label: "Date of Birth", type: "date" },
                    ].map((field) => (
                      <TextField
                        key={field.name}
                        required
                        fullWidth
                        name={field.name}
                        label={field.label}
                        type={field.type || "text"}
                        value={formData[field.name]}
                        onChange={handleChange}
                        variant="outlined"
                        InputLabelProps={
                          field.type === "date" ? { shrink: true } : undefined
                        }
                      />
                    ))}

                    <TextField
                      required
                      fullWidth
                      name="about"
                      label="About"
                      multiline
                      rows={4}
                      value={formData.about}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 4,
                  width: "30vw",
                  margin: "20px auto",
                  display: "block",
                  fontSize: {
                    xs: '0.6rem',  // for small screens (tablet)
                    sm : '0.7rem',
                    md: '1rem',    // for medium screens (laptops/tablets and above)
                  },
                  backgroundColor: "#05cdec",
                  "&:hover": {
                    backgroundColor: "#039bbd",
                  },
                }}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default AddNewDoctor;