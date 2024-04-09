import React, { useState } from "react";
import { Radio, Row, Col } from "antd";
import LinkDisplay from "../components/TextDisplay";
import TextDisplay from "../components/LinkDisplay";

const MainPage = () => {
  const [activeOption, setActiveOption] = useState("Text");

  const updateOption = (e) => {
    setActiveOption(e.target.value);
  };

  return (
    <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
      <Col span={12}>
        <Radio.Group
          onChange={updateOption}
          value={activeOption}
          optionType="button"
          buttonStyle="solid"
        >
          <Radio.Button value="Text">Text</Radio.Button>
          <Radio.Button value="URL">URL</Radio.Button>
        </Radio.Group>
        {activeOption === "Text" ? <LinkDisplay /> : null}
        {activeOption === "URL" ? <TextDisplay /> : null}
      </Col>
    </Row>
  );
};

export default MainPage;
