import React from "react";
import { Route, Routes } from "react-router-dom";
import Splash from "./pages/Splash/splash";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
    </Routes>
  );
};

export default App;
