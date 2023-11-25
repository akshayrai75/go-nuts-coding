import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getS3Link } from "../../utils/getS3ObjectLink";
import { getFormData } from "../../utils/helper";
import APIService from "../../utils/APIService";

function UploadTargetFile() {
  const [targetImg, setTargetImg] = useState();
  async function handleFormInput(e) {
    if (e.target.files && e.target.files) {
      const user = JSON.parse(sessionStorage.getItem("user")) || {};
      const link = await getS3Link(e.target.files[0], user.id);
      setTargetImg(link);
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user")) || {};
    const details = {
      ...location.state,
      targetImage: targetImg,
      userId: user.id,
    };
    // console.log("submit details", details);
    const data = getFormData(details);
    APIService.postData("member/admin", "add-new-content", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="targetImage">
          <Form.Label>Select Target Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            name="targetImage"
            onChange={handleFormInput}
            required
          />
          <Form.Text className="text-muted">
            Upload the target image to map AR content.
          </Form.Text>
        </Form.Group>

        <div className="space-x-6 flex justify-end">
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Button type="submit" variant="primary">
            Save Mapping
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default UploadTargetFile;
