import React from "react";
import ContentForm from "./ContentForm";

function DetailsForm(props) {
  const {
    isDetailsOpen,
    onDetailsOpen,
    detailsViewData,
    setDetailsViewData,
    onDetailsClose,
  } = props;

  return (
    <ContentForm
      isModalOpen={isDetailsOpen}
      onModalClose={onDetailsClose}
      formDetails={detailsViewData}
      setFormDetails={setDetailsViewData}
      handleFormSubmit={() => {}}
      isDetailsForm
    />
  );
}

export default DetailsForm;
