import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false); // Hamburger menu
  const [profileMenu, setProfileMenu] = useState(false); // Profile dropdown
  const [user, setUser] = useState(null); // logged in user
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileMenu(false);
    navigate("/login");
  };

  const isLoggedIn = !!user;

  return (
    <>
      <nav className="navbar">
        {/* LEFT - Hamburger */}
        <div className="nav-left" onClick={() => setOpenMenu(!openMenu)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <input className="search" placeholder="Search" />

          {isLoggedIn && (
            <div className="profile-wrapper">
              <img
                className="profile-pic"
                src={user.photo || "https://i.pravatar.cc/40"}
                alt="profile"
                onClick={() => setProfileMenu(!profileMenu)}
              />

              {profileMenu && (
                <div className="profile-dropdown">
                  <img
                    className="profile-pic-large"
                    src={user.photo || "https://i.pravatar.cc/40"}
                    alt="profile"
                  />
                  <p className="profile-name">{user.name}</p>
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

          {/* Always show Men / Women links */}
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
