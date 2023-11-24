import React from "react";
import { useNavigate } from "react-router-dom";

function ContentTypeSelection() {
  const navigate = useNavigate();
  const handleDefaultNavigation = () => {
    navigate("default-overlay");
  };
  const handleCustomNavigation = () => {
    navigate("custom-overlay");
  };
  return (
    <div className="mt-10 flex w-1/2 mx-auto justify-around">
      <div
        className="flex items-center  justify-center w-80 h-72 rounded-md bg-sky-500/50"
        onClick={handleDefaultNavigation}
      >
        Default
      </div>
      <div
        className="flex items-center  justify-center w-80 h-72 rounded-md bg-sky-500/50"
        onClick={handleCustomNavigation}
      >
        Custom
      </div>
    </div>
  );
}

export default ContentTypeSelection;
