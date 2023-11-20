import React, { useState } from "react";
import logo from "../../assets/logo512.png";
import "./LoginHome.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FormGroup } from "react-bootstrap";

const LoginHome = () => {
  const [user, setUser] = useState({
    username: "",
    pass: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    // console.log(e.target.value);
    let value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const userLogin = (e) => {
    e.preventDefault();
    // TODO: API intergation
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="d-flex justify-content-end companyLogo">
          <span>
            <img src={logo} alt="Evolved Vision Logo" height={"120vm"}></img>
          </span>
        </div>
        <div className="login-panel">
          <div className="login-panel-header">
            <h1>Sign In</h1>
          </div>
          <div className="login-panel-body">
            <Form onSubmit={(e) => userLogin(e)}>
              <InputGroup size="lg" className="mb-3 login-input-group-set">
                <FontAwesomeIcon
                  icon={faUser}
                  className="login-input-group-icon"
                />
                <Form.Control
                  placeholder="Username"
                  name="username"
                  aria-label="Username"
                  aria-describedby="Username"
                  onChange={(e) => handleChange(e)}
                />
              </InputGroup>
              <InputGroup className="mb-3 login-input-group-set">
                <FontAwesomeIcon
                  icon={faKey}
                  className="login-input-group-icon"
                />
                <Form.Control
                  placeholder="Password"
                  name="pass"
                  aria-label="Password"
                  aria-describedby="Password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                />
              </InputGroup>
              <FormGroup>
                <InputGroup className="mb-3 login-input-group-set">
                  <Form.Control
                    aria-label="login-button"
                    aria-describedby="login-button"
                    type="submit"
                    value="Sign In"
                    className="login_btn"
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
          <div className="login-panel-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account? <a href="/register">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHome;
