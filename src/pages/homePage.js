import React, { useState } from "react";
import { Button, Radio, Row, Col } from "antd";
import TextComponent from "../components/TextComponent";
import UrlComponent from "../components/URLComponent";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState("Text");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
      <Col span={12}>
        <Radio.Group
          onChange={handleOptionChange}
          value={selectedOption}
          optionType="button"
          buttonStyle="solid"
        >
          <Radio.Button value="Text">Text</Radio.Button>
          <Radio.Button value="URL">URL</Radio.Button>
        </Radio.Group>
        {selectedOption === "Text" ? <TextComponent /> : null}
        {selectedOption === "URL" ? <UrlComponent /> : null}
      </Col>
    </Row>
  );
};

export default HomePage;
