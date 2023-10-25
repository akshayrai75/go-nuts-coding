import LoginHome from "./login/LoginHome";
import './App.css';
import RegisterUser from "./register/RegisterUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./admin/AdminHome";
import UserHome from "./user/UserHome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginHome />}></Route>
          <Route exact path='/register' element={<RegisterUser />}></Route>
          <Route exact path='/admin' element={<AdminHome />}></Route>
          <Route exact path='/user' element={<UserHome />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
