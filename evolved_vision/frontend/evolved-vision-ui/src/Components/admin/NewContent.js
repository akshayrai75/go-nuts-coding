import React, { useState } from "react";
import ContentForm from "./ContentForm";

const NewContent = (props) => {
  const { isNewContent, onNewContentClose } = props;

  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    pdfFile: "",
    targetImageFile: "",
    arModelFile: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submit", formDetails);
  };

  return (
    <ContentForm
      isModalOpen={isNewContent}
      onModalClose={onNewContentClose}
      handleFormSubmit={handleFormSubmit}
      formDetails={formDetails}
      setFormDetails={setFormDetails}
    />
  );
};

export default NewContent;
