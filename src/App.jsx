import Login from "./screens/auth/loginscreen";
import Signin from "./screens/auth/signinscreen";
import Home from "./screens/homescreen";
import SalonCartScreen from "./screens/saloncartscreen";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// App.jsx
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/salons" element={<SalonCartScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
