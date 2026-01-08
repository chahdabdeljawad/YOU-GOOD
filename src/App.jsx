import React, { useState } from "react"; // <-- added useState
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./screens/auth/loginscreen";
import Signin from "./screens/auth/signinscreen";
import Home from "./screens/homescreen";
import SalonCartScreen from "./screens/saloncartscreen";

import "./App.css";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />{" "}
          <Route path="/salons" element={<SalonCartScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
