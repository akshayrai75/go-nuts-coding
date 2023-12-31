import React, { useState } from "react";
import logo from "../../assets/logo512.png";
import "./RegisterUser.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FormGroup } from "react-bootstrap";
import APIService from "../../utils/APIService";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { USER_ROLES } from "../../constants";

const RegisterUser = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState({
    role: USER_ROLES.USER,
    emailId: "",
    username: "",
    pass: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "role") {
      if (e.target.value === "on") {
        value = USER_ROLES.ADMIN;
      } else {
        value = USER_ROLES.USER;
      }
    }
    setUser({ ...user, [e.target.name]: value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    APIService.postData("member", "register", user)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log("User Added Successfully");
          setMsg("User Added Sucessfully");
          setUser({
            role: "USER",
            emailId: "",
            username: "",
            pass: "",
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setMsg(
          "Either member with same username or email already exists, hence try different details, or internal server issue, hence try again later."
        );
      });
  };

  const getPanelHeight = () => {
    if (msg) {
      return { height: "550px" };
    }
  };

  return (
    <div className="registration-container">
      <div className=" h-100">
        <div className="register-companyLogo">
          <span>
            <img src={logo} alt="Evolved Vision Logo" height={50}></img>
          </span>
        </div>
        <div className="register-panel" style={getPanelHeight()}>
          <div className="register-panel-header">
            {/* <h1>Sign Up</h1> */}
            <Heading style={{ color: "white", height: "70px" }}>
              Sign Up
            </Heading>
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
          {msg && <text style={{ color: "red" }}>{msg}</text>}
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
