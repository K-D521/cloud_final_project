import React, { useState } from "react";
import { Input, Button, Row, Col, Card } from "antd";
import axios from "axios";

const { TextArea } = Input;

const LinkDisplay = () => {
  const [inputURL, setInputURL] = useState("");
  const [summaryContent, setSummaryContent] = useState("");

  const updateInputURL = (event) => {
    setInputURL(event.target.value);
  };

  const API_ENDPOINT = process.env.REACT_APP_TEXT_LAMBDA;

  const fetchSummaryContent = async () => {
    try {
      const payload = {
        method: "url",
        content: inputURL,
      };
      const result = await axios.post(
        `${API_ENDPOINT}/website-summary`,
        payload
      );

      setSummaryContent(result.data.summary);
    } catch (error) {
      console.error("Failed to retrieve summary:", error);
      setSummaryContent(
        "Unable to fetch summary. Please ensure the URL is correct and try again."
      );
    }
  };

  return (
    <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
      <Col span={12}>
        <Card title="Website Summary" style={{ width: "100%" }}>
          <Input
            placeholder="Enter URL here..."
            value={inputURL}
            onChange={updateInputURL}
          />
          <Button
            type="primary"
            onClick={fetchSummaryContent}
            style={{ marginTop: "10px" }}
          >
            Generate Summary
          </Button>
          <TextArea
            rows={4}
            placeholder="Summary will appear here"
            value={summaryContent}
            disabled
            style={{ marginTop: "10px" }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default LinkDisplay;
