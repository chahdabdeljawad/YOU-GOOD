import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./screens/homescreen";
import Login from "./screens/auth/loginscreen";
import Signin from "./screens/auth/signinscreen";
import Profile from "./screens/profile";
import SalonCartScreen from "./screens/saloncartscreen";
import ReservationScreen from "./screens/reservationscreen";
function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <BrowserRouter>
      {/* Pass user state to Navbar */}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/salons" element={<SalonCartScreen />} />
        <Route path="/reservation/:salonId" element={<ReservationScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
