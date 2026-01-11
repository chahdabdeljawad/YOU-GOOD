import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar({ user, setUser }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setProfileOpen(false);
    navigate("/login");
  };

  // Profile picture fallback
  const profilePic = user?.photo
    ? user.photo
    : `https://i.pravatar.cc/150?u=${user?.id || "default"}`;

  return (
    <>
      <nav className="navbar">
        {/* LEFT: Hamburger */}
        <div
          className="nav-left"
          onClick={() => setHamburgerOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* CENTER: Title/Logo - OPTIONAL, uncomment if you want it */}
        {/* <div className="nav-center">
          <Link to="/" style={{ textDecoration: 'none', color: '#111' }}>
            YOU GOOD
          </Link>
        </div> */}

        {/* RIGHT: Search + Profile (only when logged in) */}
        <div className="nav-right">
          <input className="search" placeholder="Search..." />

          {/* Only show profile dropdown when user is logged in */}
          {user && (
            <div
              className="profile-wrapper"
              ref={profileRef}
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen((prev) => !prev);
              }}
            >
              <img
                src={profilePic}
                alt={user.name || "User"}
                className="profile-pic"
              />
              {profileOpen && (
                <div className="profile-dropdown">
                  <img
                    src={profilePic}
                    alt={user.name || "User"}
                    className="profile-pic-large"
                  />
                  <p className="profile-name">{user.name}</p>
                  <p className="profile-role">{user.role}</p>
                  <Link to="/profile" onClick={() => setProfileOpen(false)}>
                    See Profile
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
          {/* REMOVED: No Login/Sign Up links in top-right */}
        </div>
      </nav>

      {/* Hamburger menu dropdown - this is where Login/Sign Up will appear */}
      {hamburgerOpen && (
        <div className="hamburger-dropdown">
          <Link to="/" onClick={() => setHamburgerOpen(false)}>
            Home
          </Link>

          {/* Show auth links only when NOT logged in */}
          {!user ? (
            <>
              <Link to="/login" onClick={() => setHamburgerOpen(false)}>
                Login
              </Link>
              <Link to="/signin" onClick={() => setHamburgerOpen(false)}>
                Sign Up
              </Link>
              <Link
                to="/register-salon"
                onClick={() => setHamburgerOpen(false)}
              >
                Register Salon
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={() => setHamburgerOpen(false)}>
                Profile
              </Link>
              <button onClick={handleLogout} className="logout-btn-hamburger">
                Logout
              </button>
            </>
          )}

          <Link to="/salons?gender=man" onClick={() => setHamburgerOpen(false)}>
            Men
          </Link>
          <Link
            to="/salons?gender=women"
            onClick={() => setHamburgerOpen(false)}
          >
            Women
          </Link>
        </div>
      )}
    </>
  );
}
