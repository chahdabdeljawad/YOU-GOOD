import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const isLoggedIn = true;

  return (
    <>
      <nav className="navbar">
        {/* LEFT - Hamburger */}
        <div className="nav-left" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <input className="search" placeholder="Search" />
          {isLoggedIn && (
            <img
              className="profile-pic"
              src="https://i.pravatar.cc/40"
              alt="profile"
            />
          )}
        </div>
      </nav>
      {/* Dropdown menu */}
      {open && (
        <div className="dropdown">
          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link to="/signin" onClick={() => setOpen(false)}>
            Sign in
          </Link>
          <Link to="/men" onClick={() => setOpen(false)}>
            Men
          </Link>
          <Link to="/women" onClick={() => setOpen(false)}>
            Women
          </Link>
        </div>
      )}
    </>
  );
}
