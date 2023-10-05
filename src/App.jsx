import React from "react";
import { Route, Routes } from "react-router-dom";
import Splash from "./pages/Splash/splash";
import Onbaording from "./components/Onboading/Onbaording";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onbaording />} />
    </Routes>
  );
};

export default App;
