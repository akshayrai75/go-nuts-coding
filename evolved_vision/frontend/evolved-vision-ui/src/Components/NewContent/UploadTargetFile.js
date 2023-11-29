import React, { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getS3Link } from "../../utils/getS3ObjectLink";
import { getFormData } from "../../utils/helper";
import APIService, { TARGET_IMAGE_URL } from "../../utils/APIService";
import { formatNewContentPayload } from "../../utils/fomatDataForAPI";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadTargetFile() {
  const [targetImg, setTargetImg] = useState();
  const [loading, setLoading] = useState(false);

  const showToast = (message, type) => {
    toast[type](message);
  };

  async function handleFormInput(e) {
    if (e.target.files && e.target.files) {
      const user = JSON.parse(sessionStorage.getItem("user")) || {};
      const link = await getS3Link(e.target.files[0], user.id);
      setTargetImg(link);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(sessionStorage.getItem("user")) || {};
    showToast("Creating .zpt file", "info");

    const details = {
      ...location.state,
      targetImage: targetImg,
      userId: user.id,
    };
    // console.log("setLoading" );
    axios
      .post(TARGET_IMAGE_URL, {
        s3Link: details.targetImage,
      })
      .then((res) => {
        console.log("rs", res.data, res.data.zptUrl);

        details.targetImgZpt = res.data.zptUrl;
        const data = getFormData(formatNewContentPayload(details));
        showToast("Submitting content", "info");

        console.log("data", details, data);
        APIService.postData("member/admin", "add-new-content", data)
          .then((response) => {
            showToast("Content submitted successfully", "success");

            console.log(response);
            setLoading(false);
            navigate("/");
          })
          .catch((error) => {
            showToast(`Error: ${error.message}`, "error");
            setLoading(false);
            console.error(error);
          });
      })
      .catch((e) => {
        showToast(`Error generating .zpt file: ${e.message}`, "error");
        setLoading(false);

        console.log("e", e);
      });
  };

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
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
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              "Save Mapping"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default UploadTargetFile;
