import React from "react";
import { Card, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ARContentDetails = (props) => {
  const location = useLocation();

  const {
    created,
    title,
    description,
    targetImage,
    modelAddress,
    customTemplate,
    images,
    videos,
    orgTargetImage,
  } = location.state || {};
  console.log("details", location, location.state);
  return (
    <Card>
      <Card.Body style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <Image src={orgTargetImage} alt="Original Target Image" fluid />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: modelAddress }}
          style={{
            border: "2px solid #000",
            borderRadius: "10px",
            paddingLeft: "20px",
            maxWidth: "1000px",
            width: "800px",
            background: "rgba(255, 255, 255, 0.8)",
          }}
        />
      </Card.Body>
      <Card.Footer>
        <p>Created on: {created}</p>
      </Card.Footer>
    </Card>
  );
};

export default ARContentDetails;
