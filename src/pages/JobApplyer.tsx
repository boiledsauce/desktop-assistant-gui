import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const JobApplyer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [resumePath, setResumePath] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResumePath(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData();
    if (resumePath) {
      formData.append('file', resumePath);
    }
    formData.append('jobDescription', jobDescription);
    formData.append('additionalInfo', additionalInfo);
  
    try {
      const response = await fetch('http://127.0.0.1:8081/generate-coverletter', { // Ensure the URL is correct
        method: 'POST', // Change to GET if you are just retrieving a PDF without sending data, or keep POST if needed
        body: formData, // Uncomment this line if your endpoint needs data to generate the PDF
      });
  
      if (response.ok) {
        const blob = await response.blob(); // Retrieve the PDF as a blob
        const url = window.URL.createObjectURL(blob); // Create a URL for the blob object
        const link = document.createElement('a'); // Create a temporary anchor tag
        link.href = url;
        link.setAttribute('download', 'cover_letter.pdf'); // Set the filename for the download
        document.body.appendChild(link);
        link.click(); // Programmatically click the link to trigger the download
        link.parentNode!.removeChild(link); // Clean up by removing the link
        window.URL.revokeObjectURL(url); // Revoke the blob URL
      } else {
        console.error('Error retrieving PDF:', response.statusText);
      }
    } catch (error) {
      console.error('Error retrieving PDF:', error);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Job Application
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                multiline
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Information"
                multiline
                rows={4}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Resume
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default JobApplyer;
