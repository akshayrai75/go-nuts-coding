import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginHome from "./Components/login/LoginHome";
import AREngine from "./Components/AR/ZapparCanvas";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginHome />} />
          <Route exact path="/ar-view" element={<AREngine />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
