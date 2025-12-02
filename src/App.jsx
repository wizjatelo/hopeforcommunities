import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import GetInvolved from "./pages/GetInvolved";
import Programs from "./pages/Programs";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>

        {/* Page routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/GetInvolved" element={<GetInvolved />} />
          <Route path="/Programs" element={<Programs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
