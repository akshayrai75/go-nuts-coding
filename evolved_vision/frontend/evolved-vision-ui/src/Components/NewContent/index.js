import React from "react";
import { Route, Routes } from "react-router-dom";
import ContentTypeSelection from "./ContentTypeSelection";
import CustomContentCreation from "./CustomContentCreation/CustomContentCreation";
import DefaultContentCreation from "./DefaultContentCreation/DefaultContentCreation";
import UploadTargetFile from "./UploadTargetFile";
import ProgressIndicator from "./progress/Progress";

function ContentCreation() {
  return (
    <>
      <h3 className="m-3 flex justify-center">Create AR Content</h3>
      <ProgressIndicator />
      <Routes>
        <Route
          exact
          path="/custom-overlay"
          element={<CustomContentCreation />}
        />
        <Route
          exact
          path="/default-overlay"
          element={<DefaultContentCreation />}
        />
        <Route exact path="/target-image" element={<UploadTargetFile />} />
        <Route exact path="/" element={<ContentTypeSelection />} />
      </Routes>
    </>
  );
}

export default ContentCreation;
