import React, { useState } from "react";
import { Input, Button, Row, Col, Card, Typography } from "antd";
import axios from "axios";

const { TextArea } = Input;

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

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error fetching URL:", error);
      setSummary("Error fetching URL. Please check the URL and try again.");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
      <Col span={12}>
        <Card title="Website Summarizer" style={{ width: "100%" }}>
          <Input
            placeholder="Paste URL here..."
            value={url}
            onChange={handleURLChange}
          />
          <Button
            type="primary"
            onClick={handleSummarize}
            style={{ marginTop: "10px" }}
          >
            Summarize
          </Button>
          <TextArea
            rows={4}
            placeholder="Summary"
            value={summary}
            disabled
            style={{ marginTop: "10px" }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default URLComponent;
