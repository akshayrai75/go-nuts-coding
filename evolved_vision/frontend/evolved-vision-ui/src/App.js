import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginHome from "./Components/login/LoginHome";
import RegisterUser from "./Components/register/RegisterUser";
import AdminHome from "./Components/admin/AdminHome";
import UserHome from "./Components/user/UserHome";
import AREngine from "./Components/AR/ZapparCanvas";
import AROverlayCutomization from "./Components/AR/AROverlayCutomization";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              exact
              path="/"
              element={<LoginHome setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route exact path="/register" element={<RegisterUser />}></Route>
            <Route exact path="/admin" element={<AdminHome />}></Route>
            <Route exact path="/user" element={<UserHome />}></Route>
            <Route exact path="/ar-view" element={<AREngine />} />
            <Route
              exact
              path="/input-content"
              element={<AROverlayCutomization />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
