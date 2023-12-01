import React, { useState } from "react";
import ContentForm from "./ContentForm";
import APIService from "../../utils/APIService";
import { getFormData } from "../../utils/helper";

const NewContent = (props) => {
  const { isNewContent, onNewContentClose } = props;

  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    pdfFile: null,
    targetImageFile: null,
    arModelFile: null,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user")) || {};
    // console.log("submit", formDetails);
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
