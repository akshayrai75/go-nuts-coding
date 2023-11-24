import React, { useState } from "react";
import APIService from "../../../utils/APIService";
import { getFormData } from "../../../utils/helper";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { generateHtml } from "./defaultTemplate";
import "../../AR/AROverlay.css";
import { getS3Link } from "../../../utils/getS3ObjectLink";
import { IS_CUSTOM_TEMPLATE } from "../../../constants";

function DefaultContentCreation() {
  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  const isDetailsForm = false;
  const navigate = useNavigate();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    pdfFile: null,
    targetImageFile: null,
    mediaFiles: null,
  });

  const setDetails = (name, value) => {
    // console.log("name", name, value);
    setFormDetails((fd) => ({
      ...fd,
      [name]: value,
    }));
  };

  async function handleFileChange(e) {
    if (e.target.files && e.target.files) {
      const link = await getS3Link(e.target.files[0], user.id);
      setDetails(e.target.name, link);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user")) || {};
    const data = getFormData(formDetails);
    data.append("userId", user.id);
    APIService.postData("member/admin", "add-new-content", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFormInput = (e) => {
    try {
      const field = e.target.name;
      switch (field) {
        case "pdfFile":
        case "mediaFiles":
        case "pdf_summary":
          handleFileChange(e);
          break;
        default:
          setDetails(e.target.name, e.target.value);
          break;
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const getHtml = () => {
    return generateHtml(
      formDetails.title,
      formDetails.description,
      formDetails.mediaFiles
    );
  };

  const handleProceed = () => {
    const html = getHtml();
    console.log("html", html);
    navigate("../target-image", {
      state: {
        model: html,
        header: formDetails.title,
        description: formDetails.description,
        images: [formDetails.mediaFiles],
        [IS_CUSTOM_TEMPLATE]: false,
      },
    });
  };

  const handlePreview = () => {
    setShowPreviewModal(true);
    const html = getHtml();
    setPreviewContent(html);
  };

  const handleClosePreviewModal = () => {
    setShowPreviewModal(false);
  };

  return (
    <Container>
      <Row>
        <Col
          className="bg-slate-300 p-10 rounded-md"
          md={{ span: 6, offset: 3 }}
        >
          {/* <h1 className="mt-4 mb-4">
            {isDetailsForm ? "VIEW CONTENT" : "ADD CONTENT"}
          </h1> */}

          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleFormInput}
                value={formDetails.title}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                name="description"
                onChange={handleFormInput}
                value={formDetails.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="pdfFile">
              <Form.Label>Add PDF</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                placeholder="Add PDF"
                name="pdfFile"
                onChange={handleFormInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="mediaFiles">
              <Form.Label>Add Images or Videos</Form.Label>
              <Form.Control
                type="file"
                accept="image/*,video/*"
                multiple // Allow multiple file selection
                placeholder="Add Images or Videos"
                name="mediaFiles"
                onChange={handleFormInput}
              />
            </Form.Group>

            {isDetailsForm && (
              <Form.Group className="mb-3" controlId="pdfSummary">
                <Form.Label>Summary From PDF</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="pdf_summary"
                  defaultValue={formDetails.pdfSummary}
                  readOnly
                />
              </Form.Group>
            )}

            {/* Add AR Model, Target Image, and other form controls here */}
            <div className="bg-red-100 py-4 flex justify-around">
              <Button className="w-1/4" variant="info" onClick={handlePreview}>
                Preview
              </Button>
              <Button
                onClick={handleProceed}
                className="w-1/4"
                variant="primary"
              >
                Proceed
              </Button>
            </div>
            <Modal
              show={showPreviewModal}
              onHide={handleClosePreviewModal}
              dialogClassName="preview-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Preview</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="froala-preview-content">
                  <div dangerouslySetInnerHTML={{ __html: previewContent }} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePreviewModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DefaultContentCreation;
