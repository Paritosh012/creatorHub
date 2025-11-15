import "../../styles/Footer.css";

import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const SiteNavbar = () => {
  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{
        background:
          "linear-gradient(180deg, rgba(11,15,25,0.75), rgba(7,9,14,0.9))",
        backdropFilter: "saturate(120%) blur(6px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
      sticky="top"
    >
      <Container fluid="lg">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div
            style={{
              height: 40,
              width: 40,
              borderRadius: 10,
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 800,
              marginRight: 10,
            }}
          >
            CH
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontWeight: 700, color: "#fff" }}>CreatorHub</div>
            <small style={{ color: "#9ca3af", fontSize: 11 }}>
              Build • Sell • Inspire
            </small>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto align-items-lg-center" style={{ gap: 12 }}>
            <Nav.Link as={Link} to="/explore">
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="/pricing">
              Pricing
            </Nav.Link>
            <Nav.Link as={Link} to="/creators">
              Creators
            </Nav.Link>

         
          </Nav>

          {/* Search (no logic) */}
          <div
            className="d-none d-lg-flex align-items-center"
            style={{ gap: 10, marginLeft: 10 }}
          >
            <InputGroup style={{ minWidth: 280 }}>
              <Form.Control className="search"
                placeholder="Search assets, creators..."
                aria-label="Search"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  color: "#e6edf3",
                }}
                // no onChange provided (no logic)
              />
              <Button
                variant="outline-light"
                style={{ borderColor: "rgba(255,255,255,0.04)" }}
                // no onClick provided (no logic)
              >
                Search
              </Button>
            </InputGroup>
          </div>

          {/* Actions */}
          <div className="ms-3 d-flex align-items-center" style={{ gap: 8 }}>
            <Button
              as={Link}
              to="/dashboard/create"
              variant="outline-light"
              size="sm"
              style={{ borderRadius: 10, padding: "6px 12px", fontWeight: 700 }}
            >
              Quick Upload
            </Button>

            <Button
              as={Link}
              to="/login"
              variant="light"
              size="sm"
              style={{ borderRadius: 10, padding: "6px 12px", fontWeight: 700 }}
            >
              Get started
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
