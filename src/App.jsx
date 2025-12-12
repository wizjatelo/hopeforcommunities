import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import GetInvolved from "./pages/GetInvolved";
import Programs from "./pages/Programs";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Donate from "./pages/Donate";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

import AlbumPage from "./pages/AlbumPage";
import PartnersPage from "./pages/PartnersPage";

import ChatbotWidget from "./components/ChatbotWidget";
import FloatingContactButton from "./components/FloatingContactButton";
  
 

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
          <Route path="/impact" element={<Impact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
        <ChatbotWidget />
        <FloatingContactButton />
      </div>
    </Router>
  );
}

export default App;