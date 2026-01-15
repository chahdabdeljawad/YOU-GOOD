import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/homescreen";
import Login from "./screens/auth/loginscreen";
import Signin from "./screens/auth/signinscreen";
import SalonRegistration from "./screens/auth/SalonRegistration";
import Profile from "./screens/profile";
import SalonCartScreen from "./screens/saloncartscreen";
import ReservationScreen from "./screens/reservationscreen";
import AdminScreen from "./screens/AdminScreen";
import AdminLogin from "./screens/auth/AdminLogin";
import About from "./screens/about";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/admin-login"
          element={<AdminLogin setAdmin={setAdmin} />}
        />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route
          path="/register-salon"
          element={<SalonRegistration setUser={setUser} />}
        />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/salons"
          element={<SalonCartScreen user={user} setUser={setUser} />}
        />
        <Route
          path="/reservation/:salonId"
          element={<ReservationScreen user={user} setUser={setUser} />}
        />

        <Route
          path="/admin"
          element={admin ? <AdminScreen /> : <Navigate to="/admin-login" />}
        />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
