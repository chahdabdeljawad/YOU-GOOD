import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./screens/homescreen";
import Login from "./screens/auth/loginscreen";
import Signin from "./screens/auth/signinscreen";
import SalonRegistration from "./screens/auth/SalonRegistration"; // ADD THIS
import Profile from "./screens/profile";
import SalonCartScreen from "./screens/saloncartscreen";
import ReservationScreen from "./screens/reservationscreen";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route
          path="/register-salon"
          element={<SalonRegistration setUser={setUser} />}
        />{" "}
        {/* ADD THIS */}
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/salons"
          element={<SalonCartScreen user={user} setUser={setUser} />}
        />
        <Route
          path="/reservation/:salonId"
          element={<ReservationScreen user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
