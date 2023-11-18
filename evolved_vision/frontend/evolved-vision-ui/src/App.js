import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginHome from "./Components/login/LoginHome";
import RegisterUser from "./Components/register/RegisterUser";
import AdminHome from "./Components/admin/AdminHome";
import UserHome from "./Components/user/UserHome";
import AREngine from "./Components/AR/ZapparCanvas";
import AROverlayCutomization from "./Components/AR/AROverlayCutomization";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginHome />} />
          <Route exact path="/register" element={<RegisterUser />}></Route>
          <Route exact path="/admin" element={<AdminHome />}></Route>
          <Route exact path="/user" element={<UserHome />}></Route>
          <Route exact path="/ar-view" element={<AREngine />} />
          <Route
            exact
            path="/input-content"
            element={<AROverlayCutomization />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
