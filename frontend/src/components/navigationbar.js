import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";

const Navigationbar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="sm"
        style={{ backgroundColor: "#6F6767" }}
      >
        <Navbar.Brand href="#" className="d-flex p-2">
          <img src={logo} className="logo-style" alt="" loading="lazy" />
          <div style={{ marginTop: "10px" }}>
            <label style={{ color: "white" }}>Mahatma Gandhi University</label>
          </div>
        </Navbar.Brand>
        <Container>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            data-bs-target="#navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll" className="right-aligned">
            <Nav className="mr-auto">
              <Nav.Link href="/" style={{ color: "white" }}>
                Home
              </Nav.Link>
              <Nav.Link href="/about" style={{ color: "white" }}>
                About
              </Nav.Link>
              <Nav.Link href="/contact" style={{ color: "white" }}>
                Contact
              </Nav.Link>
              <Nav.Link href="/login" style={{ color: "white" }}>
                Services
              </Nav.Link>
              <Nav.Link href="/login" style={{ color: "white" }}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Navigationbar;
