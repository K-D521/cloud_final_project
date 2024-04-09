import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";

const URLComponent = () => {
  const [url, setURL] = useState("");
  const [summary, setSummary] = useState("");

  const handleURLChange = (event) => {
    setURL(event.target.value);
  };

  const API_KEY = process.env.REACT_APP_TEXT_LAMBDA;

  const handleSummarize = async () => {
    try {
      const requestBody = {
        method: "url",
        content: url,
      };
      const response = await axios.post(
        `${API_KEY}/website-summary`,
        requestBody
      );

      console.log(response);

      const data = response.data.summary;

      console.log(data);
      setSummary(data);
    } catch (error) {
      console.error("Error fetching URL:", error);
      setSummary("Error fetching URL. Please check the URL and try again.");
    }
  };

  const textFieldStyle = {
    border: "none",
    resize: "none", // Prevents resizing of the text area
    outline: "none", // Removes focus outline when selected
    boxShadow: "none", // Removes any box shadow
  };

  return (
    <Container maxWidth="sm">
      {" "}
      {/* Adjust the maxWidth as needed */}
      <Box mt={3} textAlign="center">
        <Typography variant="h4">Website Summarizer</Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 2,
          mt: 2,
        }}
      >
        <TextField
          label="Paste URL here..."
          fullWidth
          variant="outlined"
          value={url}
          onChange={handleURLChange}
          inputProps={{ style: textFieldStyle }} // Apply the custom style to the input
        />
        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSummarize}>
            Summarize
          </Button>
        </Box>
        <TextField
          label="Summary"
          multiline
          rows={12}
          fullWidth
          variant="outlined"
          value={summary}
          disabled
          inputProps={{ style: textFieldStyle }} // Apply the custom style to the input
          sx={{ mt: 2 }} // Adjust the margin-top as needed
        />
      </Paper>
    </Container>
  );
};

export default URLComponent;
