import React, { useRef, useState } from "react";
import "./AROverlay.css";
import FroalaEditor from "react-froala-wysiwyg";
// required plugins
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/video.min.js";
// import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/font_size.min.js";
// stylings
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import APIService from "../../utils/APIService";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { extractContent } from "../../utils/extractContentFromHTML";
import { IS_CUSTOM_TEMPLATE } from "../../constants";
function AROverlayCutomization() {
  const [model, setModel] = useState("Example Set");
  const handleModelChange = (event) => {
    setModel(event);
  };
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const editorRef = useRef(null); // Ref to store the editor instance
  const toolbarOptions = {
    moreText: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "fontSize",
        "textColor",
        "backgroundColor",
        "inlineClass",
        "inlineStyle",
        "clearFormatting",
      ],
    },

    moreParagraph: {
      buttons: [
        "alignLeft",
        "alignCenter",
        "formatOLSimple",
        "alignRight",
        "alignJustify",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "outdent",
        "indent",
        "quote",
      ],
    },

    moreRich: {
      buttons: ["insertLink", "insertImage", "insertVideo"],
    },
    toolbarButtons: [
      "moreText",
      "moreParagraph",
      "moreRich",
      "moreMisc",
      "moreHeader",
    ],
    moreMisc: {
      buttons: ["undo", "redo"],
      align: "right",
      buttonsVisible: 2,
    },
  };
  const navigate = useNavigate();
  const handleProceed = () => {
    const details = extractContent(model);
    navigate("../target-image", {
      state: { ...details, pdfFile, model, [IS_CUSTOM_TEMPLATE]: true },
    });
  };

  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  const handleClosePreviewModal = () => {
    setShowPreviewModal(false);
  };

  const handleVideoReplacement = (editor, newVideoSrc) => {
    const currentHtml = editor.html.get();
    const videoElement = document.createElement("video");
    videoElement.src = newVideoSrc;

    const newHtml = currentHtml.replace(
      /<video[^>]*>[\s\S]*?<\/video>/g,
      videoElement.outerHTML
    );

    editor.html.set(newHtml);
  };

  const handleMediaUpload = (type, files, editor) => {
    const formData = new FormData();
    const user = JSON.parse(sessionStorage.getItem("user")) || {};

    formData.append("file", files[0]);
    formData.append("userId", user.id);

    APIService.postData("member", "admin/upload", formData)
      .then((resp) => {
        if (resp && resp.data && resp.data.url) {
          if (type === "image") {
            editorRef.current[type].insert(
              resp.data.url,
              null,
              null,
              editorRef.current[type].get()
            );
          } else {
            handleVideoReplacement(editor, resp.data.url);
          }
        } else {
          console.error("Invalid response format from the server.");
        }
      })
      .catch((error) => {
        console.error(`Error uploading ${type}:`, error);
      });
  };

  async function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  }

  return (
    <div className="flex flex-col">
      <FroalaEditor
        model={model}
        onModelChange={handleModelChange}
        config={{
          toolbarOptions,
          videoMaxSize: 1024 * 1024 * 15,
          heightMax: 350,
          heightMin: 300,
          width: 500,
          placeholder: "Edit Me",
          events: {
            "image.beforeUpload": function (images) {
              editorRef.current = this;
              handleMediaUpload("image", images, this);
            },
            "video.beforeUpload": function (videos) {
              editorRef.current = this;
              handleMediaUpload("video", videos, this);
            },
          },
        }}
      />
      <Form.Group className="mb-3" controlId="pdfFile">
        <Form.Label>Add PDF</Form.Label>
        <Form.Control
          type="file"
          accept=".pdf"
          placeholder="Add PDF"
          name="pdfFile"
          onChange={handleFileChange}
        />
      </Form.Group>

      <div className=" py-4 flex justify-around">
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button variant="info" onClick={handlePreview}>
          Preview
        </Button>
        <Button variant="primary" onClick={handleProceed}>
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
            <FroalaEditorView model={model} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePreviewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AROverlayCutomization;
