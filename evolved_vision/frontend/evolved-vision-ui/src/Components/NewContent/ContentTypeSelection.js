import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultIcon from "../../assets/icons/defaultprototype.png";
import customizeIcon from "../../assets/icons/template-edit.png";
import { Button } from "react-bootstrap";

function ContentTypeSelection() {
  const [selectionType, setSelectionType] = useState(null);
  const navigate = useNavigate();
  const options = [
    { label: "Default", icon: defaultIcon },
    { label: "Custom", icon: customizeIcon },
  ];
  const handleSelection = (label) => {
    setSelectionType(label);
  };

  const handleNext = () => {
    if (selectionType === "Default") {
      navigate("default-overlay");
    } else {
      navigate("custom-overlay");
    }
  };
  return (
    <>
      <div className="mt-10 flex  mx-auto justify-around space-x-4">
        {options.map(({ label, icon }) => (
          <div
            className={`flex flex-col items-center justify-center w-80 h-72 rounded-xl bg-white ${
              selectionType === label ? "border-4 border-sky-500" : ""
            }`}
            onClick={() => handleSelection(label)}
          >
            <img src={icon} alt="default icon" width={120} />
            <span className="text-xl font-bold">{label}</span>
          </div>
        ))}
      </div>
      <div className="py-4 flex justify-end">
        <Button
          disabled={!selectionType}
          className="w-1/4"
          // variant="info"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default ContentTypeSelection;
