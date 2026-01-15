import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

function OffcanvasExample({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const expand = "xxl";

  // State for search input
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Get current gender from URL or use empty (search all)
      const currentGender = location.search.includes("gender=women")
        ? "women"
        : location.search.includes("gender=man")
        ? "man"
        : "";

      let url = `/salons?search=${encodeURIComponent(searchQuery.trim())}`;
      if (currentGender) {
        url += `&gender=${currentGender}`;
      }

      navigate(url);
      setSearchQuery("");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // Check if user is logged in
  const isLoggedIn = !!user;

  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="/" style={{ cursor: "pointer" }}>
          YOU GOOD
        </Navbar.Brand>

        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/" active={location.pathname === "/"}>
                Home
              </Nav.Link>
              <Nav.Link href="/About" active={location.pathname === "/About"}>
                About
              </Nav.Link>

              <NavDropdown title="Categories" id="categories-dropdown">
                <NavDropdown.Item
                  href="/salons?gender=man"
                  active={location.search.includes("gender=man")}
                >
                  Men
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/salons?gender=women"
                  active={location.search.includes("gender=women")}
                >
                  Women
                </NavDropdown.Item>
              </NavDropdown>

              {isLoggedIn ? (
                <NavDropdown
                  title={user.name || "Account"}
                  id="account-dropdown"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  {user.role === "SALON" && (
                    <NavDropdown.Item href={`/salon/${user.id}`}>
                      My Salon
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title="Login" id="login-dropdown">
                  <NavDropdown.Item href="/admin-login">Admin</NavDropdown.Item>
                  <NavDropdown.Item href="/login"> User</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/signin">Sign Up</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>

            {/* Search Form */}
            <Form className="d-flex mt-3 mt-xxl-0" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search salons, cities..."
                className="me-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <Button
                variant="outline-success"
                type="submit"
                disabled={!searchQuery.trim()}
              >
                search
              </Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
