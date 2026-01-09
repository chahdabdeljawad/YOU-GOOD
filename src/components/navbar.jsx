import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false); // Hamburger menu
  const [profileMenu, setProfileMenu] = useState(false); // Profile dropdown
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const profileRef = useRef(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileMenu(false);
    navigate("/login");
  };

  const isLoggedIn = !!user;

  // Fallback profile picture
  const profilePic = user
    ? user.photo || `https://i.pravatar.cc/40?u=${user.id}`
    : "";

  return (
    <>
      <nav className="navbar">
        {/* LEFT - Hamburger */}
        <div
          className="nav-left"
          onClick={() => {
            setOpenMenu(!openMenu);
            setProfileMenu(false); // close profile menu
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <input className="search" placeholder="Search" />

          {isLoggedIn && (
            <div
              className="profile-wrapper"
              ref={profileRef}
              onClick={() => setProfileMenu(!profileMenu)}
            >
              {/* Profile image */}
              <img className="profile-pic" src={profilePic} alt={user.name} />

              {/* Dropdown */}
              {profileMenu && (
                <div className="profile-dropdown">
                  <img
                    className="profile-pic"
                    src={profilePic}
                    alt={user.name}
                  />
                  <p className="profile-name">{user.name || "User"}</p>
                  <Link to="/profile" onClick={() => setProfileMenu(false)}>
                    See Profile
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hamburger Dropdown */}
      {openMenu && (
        <div className="dropdown">
          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setOpenMenu(false)}>
                Login
              </Link>
              <Link to="/signin" onClick={() => setOpenMenu(false)}>
                Sign Up
              </Link>
            </>
          )}
          <Link to="/salons?gender=man" onClick={() => setOpenMenu(false)}>
            Men
          </Link>
          <Link to="/salons?gender=women" onClick={() => setOpenMenu(false)}>
            Women
          </Link>
        </div>
      )}
    </>
  );
}
