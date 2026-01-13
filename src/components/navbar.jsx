import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";

function OffcanvasExample() {
  const navigate = useNavigate();
  const expand = "xxl"; // only XXL version

  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="#">YOU GOOD</Navbar.Brand>

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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/footer">About</Nav.Link>

              <NavDropdown title="Categories">
                <NavDropdown.Item href="http://localhost:5173/salons?gender=man">
                  Men
                </NavDropdown.Item>
                <NavDropdown.Item href="http://localhost:5173/salons?gender=women">
                  Women
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="connexion">
                <NavDropdown.Item href="http://localhost:5173/admin-login">
                  Admin
                </NavDropdown.Item>
                <NavDropdown.Item href="http://localhost:5173/Login">
                  User
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="d-flex mt-3 mt-xxl-0">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
