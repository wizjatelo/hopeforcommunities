import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import GetInvolved from "./pages/GetInvolved";
import Programs from "./pages/Programs";
import Impact from "./pages/Impact";

import AlbumPage from "./pages/AlbumPage";
import PartnersPage from "./pages/PartnersPage";
  
 

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/getinvolved" element={<GetInvolved />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/album" element={<AlbumPage />} />
          < Route path="/impact" element={<Impact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
