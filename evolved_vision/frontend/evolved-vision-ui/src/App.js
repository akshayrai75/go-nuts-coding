import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginHome from "./Components/login/LoginHome";
import RegisterUser from "./Components/register/RegisterUser";
import AdminHome from "./Components/admin/AdminHome";
import AREngine from "./Components/AR/ZapparCanvas";
import AROverlayCutomization from "./Components/AR/AROverlayCutomization";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useState } from "react";
import ContentCreation from "./Components/NewContent";
import { Button, Container, Navbar } from "react-bootstrap";
import logo from "./assets/logo512.png";
import ARContentDetails from "./Components/ARContentDetails";
import LogoutComponent from "./Components/logout/Logout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
      {isAuthenticated ? (
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Evolved Vision
            </Navbar.Brand>
            <LogoutComponent setIsAuthenticated={setIsAuthenticated} />
          </Container>
        </Navbar>
      ) : (
        <></>
      )}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/"
            element={<LoginHome setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route exact path="/register" element={<RegisterUser />}></Route>
          <Route exact path="/admin" element={<AdminHome />}></Route>
          <Route exact path="/ar-view" element={<AREngine />} />
          <Route path="/new-content/*" element={<ContentCreation />} />
          <Route path="/AR-content-details" element={<ARContentDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
