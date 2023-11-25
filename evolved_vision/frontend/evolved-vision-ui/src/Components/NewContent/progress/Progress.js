import "./progress.css";
import React from "react";
import { useLocation } from "react-router-dom";

const steps = [
  [{ path: "/new-content", label: "Choose Template Options" }],
  [
    { path: "/new-content/custom-overlay", label: "Template" },
    { path: "/new-content/default-overlay", label: "Template" },
  ],
  [{ path: "/new-content/target-image", label: "Provide a Target Image" }],
];

const ProgressIndicator = () => {
  const location = useLocation();

  // Get the current step based on the path
  const currentStep =
    steps.findIndex((step) => {
      return step.some((subStep) => subStep.path === location.pathname);
    }) + 1;

  const handleStepClick = (stepNumber) => {
    // Calculate the number of steps to go back
    const stepsToGoBack = currentStep - stepNumber;

    // Go back in the history by the calculated number of steps
    if (stepsToGoBack > 0) {
      window.history.go(-stepsToGoBack);
    }
  };

  return (
    <div className="progress-indicator">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${currentStep === index + 1 ? "active" : ""}`}
        >
          <div className="step-content">
            <div
              className="step-number"
              onClick={() => handleStepClick(index + 1)}
            >
              {index + 1}
            </div>
            <div className="step-label font-semibold">
              {steps?.[index]?.[0]?.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
