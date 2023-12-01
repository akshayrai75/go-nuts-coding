import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const LogoutComponent = ({ setIsAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
    setShowModal(false);
  };

  return (
    <>
      <button className="btn btn-danger" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        Logout
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutComponent;
