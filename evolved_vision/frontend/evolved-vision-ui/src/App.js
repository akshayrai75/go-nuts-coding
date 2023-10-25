import { BrowserRouter, Routes, Route } from "react-router-dom";
import AREngine from "./AR/ZapparCanvas";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/ar-view" element={<AREngine />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
