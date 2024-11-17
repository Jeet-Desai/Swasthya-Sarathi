import React, { useState, useRef } from "react";
import {
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  Grid2,
  IconButton,
  useMediaQuery,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Upload as UploadIcon,
  Close as CloseIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

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
    body1: {
      "@media (max-width:900px)": {
        fontSize: "0.9rem",
      },
      "@media (max-width:600px)": {
        fontSize: "0.8rem",
      },
      "@media (max-width:400px)": {
        fontSize: "0.55rem",
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

const AddMedicalRecord = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    ailment: "",
    doctorName: "",
    department: "",
    doctorId: "",
    diagnosis: "",
    prescriptions: ""
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const isLarge = useMediaQuery("(min-width:1200px)");
  const isMedium = useMediaQuery("(min-width:900px)");
  const isSmall = useMediaQuery("(max-width:600px)");

  const getResponsiveSize = () => {
    if (isLarge) return "large";
    if (isMedium) return "medium";
    return "small";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([
      ...uploadedFiles,
      ...files.map((file) => ({
        name: file.name,
        size: file.size,
      })),
    ]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setUploadedFiles(
      uploadedFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const getResponsiveSpacing = () => {
    if (isLarge) return 2.5;
    if (isMedium) return 2;
    return 1;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          //   minHeight: '100vh',
          backgroundColor: "#05cdec",
          padding: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          overflowY: "auto",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: { xs: "90%", sm: "95%", md: "100%" },
            backgroundColor: "white",
            overflowY: "auto",
          }}
        >
          <CardContent
            sx={{
              padding: { xs: "8px", sm: "20px", md: "24px", lg: "32px" },
              "&:last-child": {
                pb: { xs: "16px", sm: "20px", md: "24px", lg: "32px" },
              },
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
              Add Medical Record
            </Typography>

            <form>
              <Grid2 container columnSpacing={getResponsiveSpacing()}>
                <Grid2 item size={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: getResponsiveSpacing(),
                    }}
                  >
                    {["patientName", "age"].map((field) => (
                      <TextField
                        required
                        key={field}
                        fullWidth
                        name={field}
                        label={
                          field.charAt(0).toUpperCase() +
                          field.slice(1).replace(/([A-Z])/g, " $1")
                        }
                        variant="outlined"
                        value={formData[field]}
                        onChange={handleChange}
                        size={
                          getResponsiveSize() === "small" ? "small" : "medium"
                        }
                      />
                    ))}
                    <FormControl fullWidth required>
                      <InputLabel
                        size={
                          getResponsiveSize() === "small" ? "small" : "medium"
                        }
                      >
                        Gender
                      </InputLabel>
                      <Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        label="Gender"
                        size={
                          getResponsiveSize() === "small" ? "small" : "medium"
                        }
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </FormControl>
                    {["height (in cm)", "weight (in kg)", "ailment"].map((field) => (
                      <TextField
                        required
                        key={field}
                        fullWidth
                        name={field}
                        label={
                          field.charAt(0).toUpperCase() +
                          field.slice(1).replace(/([A-Z])/g, " $1")
                        }
                        variant="outlined"
                        value={formData[field]}
                        onChange={handleChange}
                        size={
                          getResponsiveSize() === "small" ? "small" : "medium"
                        }
                      />
                    ))}
                    <Button
                      variant="outlined"
                      startIcon={<UploadIcon />}
                      onClick={() => fileInputRef.current.click()}
                      sx={{
                        justifyContent: "center",
                        backgroundColor: "#f8f9fa",
                        borderColor: "#dee2e6",
                        color: "#212529",
                        padding:
                          getResponsiveSize() === "small"
                            ? "4px 8px"
                            : "12px 24px",
                        fontSize: "0.8rem", // Default font size
                        width: "50%",
                        margin: "auto",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#e9ecef",
                          borderColor: "#dee2e6",
                        },
                        "@media (max-width: 900px)": {
                          fontSize: "0.9rem",
                        },
                        "@media (max-width: 600px)": {
                          fontSize: "0.68rem",
                        },
                        "@media (max-width: 400px)": {
                          fontSize: "0.45rem",
                        },
                      }}
                    >
                      Upload Reports
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                      multiple
                    />
                    {uploadedFiles.length > 0 && (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: "#f5f5f5",
                          borderRadius: 2,
                          mb: 2,
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          Uploaded Files:
                        </Typography>
                        {uploadedFiles.map((file, index) => (
                          <Chip
                            key={index}
                            label={file.name}
                            onDelete={() => handleRemoveFile(index)}
                            sx={{ m: 0.5 }}
                          />
                        ))}
                      </Paper>
                    )}
                  </Box>
                </Grid2>

                <Grid2 item size={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: getResponsiveSpacing(),
                    }}
                  >
                    <TextField
                      required
                      key="doctorName"
                      fullWidth
                      name="doctorName"
                      label={"Doctor Name"}
                      variant="outlined"
                      value={formData["doctorName"]}
                      onChange={handleChange}
                      size={
                        getResponsiveSize() === "small" ? "small" : "medium"
                      }
                    />
                    <FormControl fullWidth required>
                      <InputLabel
                        size={
                          getResponsiveSize() === "small" ? "small" : "medium"
                        }
                      >
                        Department
                      </InputLabel>
                      <Select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        label="Department"
                        size={
                          getResponsiveSize() === "small" ? "small" : "medium"
                        }
                      >
                        <MenuItem value="Cardiology">Cardiology</MenuItem>
                        <MenuItem value="Neurology">Neurology</MenuItem>
                        <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                        <MenuItem value="Dermatology">Dermatology</MenuItem>
                        <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      required
                      key="doctorId"
                      fullWidth
                      name="doctorId"
                      label = "DoctorID"
                      variant="outlined"
                      value={formData["doctorId"]}
                      onChange={handleChange}
                      size={
                        getResponsiveSize() === "small" ? "small" : "medium"
                      }
                    />
                    <TextField
                      required
                      fullWidth
                      name="diagnosis"
                      label="Diagnosis"
                      variant="outlined"
                      multiline
                      rows={getResponsiveSize() === "small" ? 4 : 4}
                      value={formData.diagnosis}
                      onChange={handleChange}
                      size={
                        getResponsiveSize() === "small" ? "small" : "medium"
                      }
                    />

                    <TextField
                      required
                      fullWidth
                      name="prescriptions"
                      label="Prescriptions"
                      variant="outlined"
                      multiline
                      rows={getResponsiveSize() === "small" ? 4 : 4}
                      value={formData.prescriptions}
                      onChange={handleChange}
                      size={
                        getResponsiveSize() === "small" ? "small" : "medium"
                      }
                    />
                  </Box>
                </Grid2>
                <Button
                variant="outlined"
                //   onClick={(e) => e.preventDefault()}
                type="submit"
                sx={{
                  justifyContent: "center",
                  backgroundColor: "#05cdec",
                  borderColor: "#dee2e6",
                  color: "white",
                  padding:
                    getResponsiveSize() === "small" ? "4px 8px" : "12px 24px",
                  fontSize: "0.8rem", // Default font size
                  width: "30%",
                  marginLeft: "auto",
                  marginTop: "20px",
                  marginRight: "auto",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#039bbd",
                    borderColor: "#dee2e6",
                  },
                  "@media (max-width: 900px)": {
                    fontSize: "0.9rem",
                  },
                  "@media (max-width: 600px)": {
                    fontSize: "0.68rem",
                  },
                  "@media (max-width: 400px)": {
                    fontSize: "0.45rem",
                  },
                }}
              >
                Submit
              </Button>
              </Grid2>
              
            </form>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default AddMedicalRecord;
