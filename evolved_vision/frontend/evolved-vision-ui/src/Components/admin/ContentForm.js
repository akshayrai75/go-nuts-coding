import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

function ContentForm(props) {
  const {
    isModalOpen,
    onModalClose,
    formDetails,
    setFormDetails,
    handleFormSubmit,
    isDetailsForm,
  } = props;

  const setDetails = (name, value) => {
    // console.log("name", name, value);
    setFormDetails((fd) => ({
      ...fd,
      [name]: value,
    }));
  };

  const handleFormInput = (e) => {
    try {
      const field = e.target.name;
      switch (field) {
        case "pdfFile":
        case "arModelFile":
        case "targetImageFile":
          handleFileChange(e);
          break;
        default:
          setDetails(e.target.name, e.target.value);
          break;
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setDetails(e.target.name, e.target.files[0]);
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleFormSubmit}>
          <ModalHeader>
            {isDetailsForm ? "VIEW CONTENT" : "ADD CONTENT"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                required={true}
                placeholder="Title"
                name="title"
                onChange={handleFormInput}
                value={formDetails.title}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                placeholder="Description"
                onChange={handleFormInput}
                value={formDetails.description}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Add PDF</FormLabel>
              <Input
                type="file"
                accept=".pdf"
                placeholder="Add PDF"
                label="pdfFile"
                name="pdfFile"
                onChange={handleFormInput}
              />
            </FormControl>
            {/* show pdf summary only in details form */}
            {isDetailsForm ? (
              <FormControl mt={4}>
                <FormLabel>Summary From PDF</FormLabel>
                <Textarea
                  placeholder="pdf_summary"
                  defaultValue={formDetails.pdfSummary}
                />
              </FormControl>
            ) : (
              <></>
            )}
            <FormControl mt={4}>
              <FormLabel>Add AR Model</FormLabel>
              <Input
                type="file"
                accept=".glTF, .gltf, .OBJ, .obj, .fbx, .FBX, .collada, .Collada, image/*"
                placeholder="Add AR Model"
                label="arModelFile"
                name="arModelFile"
                onChange={handleFormInput}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Add Target Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                placeholder="Add Target Image"
                label="targetImageFile"
                name="targetImageFile"
                onChange={handleFormInput}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              {isDetailsForm ? "Update" : "Add"}
            </Button>
            <Button onClick={onModalClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ContentForm;
