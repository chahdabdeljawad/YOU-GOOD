import Login from "./screens/auth/loginscreen";
import Signin from "./screens/auth/signinscreen";
import Home from "./screens/homescreen";
import Carte from "./screens/saloncartscreen";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Carte" element={<Carte />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
