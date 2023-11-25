import React from "react";
import { Route, Routes } from "react-router-dom";
import ContentTypeSelection from "./ContentTypeSelection";
import CustomContentCreation from "./CustomContentCreation/CustomContentCreation";
import DefaultContentCreation from "./DefaultContentCreation/DefaultContentCreation";
import UploadTargetFile from "./UploadTargetFile";
import ProgressIndicator from "./progress/Progress";

function ContentCreation() {
  return (
    <div style={{ height: "90%" }} className="my-auto flex justify-center ">
      <div
        style={{ backgroundColor: "#ebebeb" }}
        className="mt-10 w-1/2 p-4 rounded-xl overflow-y-auto"
      >
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
      </div>
    </div>
  );
}

export default ContentCreation;
