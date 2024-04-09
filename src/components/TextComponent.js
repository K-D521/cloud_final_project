import React, { useState } from "react";
import { Input, Button, Row, Col, Card, Typography } from "antd";
import axios from "axios";

const { TextArea } = Input;

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

  return (
    <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
      <Col span={12}>
        <Card title="Text Summarizer" style={{ width: "100%" }}>
          <TextArea
            rows={4}
            placeholder="Enter your text here..."
            value={inputText}
            onChange={(e) => handleTextChange(e.target.value)}
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

export default TextComponent;
