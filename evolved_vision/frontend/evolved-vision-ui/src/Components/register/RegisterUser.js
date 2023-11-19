import React from "react";
import logo from "../../assets/logo512.png";
import "./RegisterUser.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FormGroup } from "react-bootstrap";

const RegisterUser = () => {
  const handleChange = (e) => {};

  const registerUser = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="d-flex justify-content-end companyLogo">
          <span>
            <img src={logo} alt="Evolved Vision Logo" height={"120vm"}></img>
          </span>
        </div>
        <div className="register-panel">
          <div className="register-panel-header">
            <h1>Sign Up</h1>
          </div>
          <div className="register-panel-body">
            <Form onSubmit={(e) => registerUser(e)}>
              <Form.Check
                type="switch"
                id="admin-switch"
                label="Register as Admin"
                name="role"
                className="admin-switch register-input-group-set"
                onChange={(e) => handleChange(e)}
              />
              <InputGroup size="lg" className="mb-3 register-input-group-set">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="register-input-group-icon"
                />
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="emailId"
                  aria-label="Email"
                  aria-describedby="Email"
                  onChange={(e) => handleChange(e)}
                />
              </InputGroup>
              <InputGroup size="lg" className="mb-3 register-input-group-set">
                <FontAwesomeIcon
                  icon={faUser}
                  className="register-input-group-icon"
                />
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  name="username"
                  aria-describedby="Username"
                  onChange={(e) => handleChange(e)}
                />
              </InputGroup>
              <InputGroup className="mb-3 register-input-group-set">
                <FontAwesomeIcon
                  icon={faKey}
                  className="register-input-group-icon"
                />
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  name="pass"
                  aria-describedby="Password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                />
              </InputGroup>
              <FormGroup>
                <InputGroup className="mb-3 register-input-group-set">
                  <Form.Control
                    aria-label="register-button"
                    aria-describedby="register-button"
                    type="submit"
                    value="Sign Up"
                    className="register_btn"
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
          <div className="register-panel-footer">
            <div className="d-flex justify-content-center links">
              Hhave an account? <a href="/">Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
