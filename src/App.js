import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import HeroSection from "./HeroSection";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
    
      <BrowserRouter>
      <Toaster />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/DashBoard" element={<HeroSection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
