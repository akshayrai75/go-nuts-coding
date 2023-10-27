import "./App.css";
import RegisterUser from "./register/RegisterUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginHome from "./Components/login/LoginHome";
import AdminHome from "./admin/AdminHome";
import UserHome from "./user/UserHome";
import AREngine from "./Components/AR/ZapparCanvas";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginHome />} />
          <Route exact path="/register" element={<RegisterUser />}></Route>
          <Route exact path="/admin" element={<AdminHome />}></Route>
          <Route exact path="/user" element={<UserHome />}></Route>
          <Route exact path="/ar-view" element={<AREngine />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
