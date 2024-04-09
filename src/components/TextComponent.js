import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";

const TextComponent = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");

  const handleTextChange = (text) => {
    setInputText(text);
  };
  const API_KEY = process.env.REACT_APP_TEXT_LAMBDA;
  const handleSummarize = async () => {
    try {
      const response = await axios.post(`${API_KEY}/text-summary`, {
        method: "content",
        content: inputText,
      });

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const textFieldStyle = {
    border: "none",
    resize: "none",
    outline: "none",
    boxShadow: "none",
  };

  return (
    <Container maxWidth="lg">
      <Box mt={3} textAlign="center">
        <Typography variant="h4">Text Summarizer</Typography>
      </Box>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <TextField
              label="Enter your text here..."
              multiline
              rows={20}
              fullWidth
              variant="outlined"
              value={inputText}
              onChange={(e) => handleTextChange(e.target.value)}
              inputProps={{ style: textFieldStyle }}
              sx={{ flex: 1 }}
            />
            <Box mt={2} textAlign="center" mb={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSummarize}
              >
                Summarize
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <TextField
              label="Summary"
              multiline
              rows={20}
              fullWidth
              variant="outlined"
              value={summary}
              disabled
              inputProps={{ style: textFieldStyle }} // Apply the custom style to the input
              sx={{
                flex: 1,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TextComponent;
