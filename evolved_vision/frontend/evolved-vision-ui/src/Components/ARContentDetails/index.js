import React from "react";
import { Card, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

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
    <div className="mt-12 flex justify-around">
      <div>
        <span className=" font-bold text-3xl">Target Image</span>
        <Image
          className="mt-4"
          style={{ maxWidth: "200px" }}
          src={orgTargetImage}
          alt="Original Target Image"
          fluid
        />
      </div>
      <div>
        <div className="mb-4 font-bold text-3xl">Overlay</div>

        {customTemplate ? (
          <div className="froala-preview-content">
            <FroalaEditorView model={modelAddress} />
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: modelAddress }} />
        )}
      </div>
    </div>
  );
};

export default ARContentDetails;
