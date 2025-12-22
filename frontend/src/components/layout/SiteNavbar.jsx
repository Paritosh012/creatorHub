import "../../styles/Footer.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SiteNavbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const user = localStorage.getItem("user");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      sticky="top"
      style={{
        background:
          "linear-gradient(180deg, rgba(11,15,25,0.75), rgba(7,9,14,0.9))",
        backdropFilter: "saturate(120%) blur(6px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
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

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto align-items-lg-center" style={{ gap: 12 }}>
            <Nav.Link as={Link} to="/explore">
              Explore
            </Nav.Link>

            {isLoggedIn && (
              <Nav.Link as={Link} to="/dashboard">
                Creator
              </Nav.Link>
            )}
          </Nav>

          <div
            className="d-none d-lg-flex align-items-center"
            style={{ gap: 10, marginLeft: 10 }}
          ></div>

          <div className="ms-3 d-flex align-items-center" style={{ gap: 8 }}>
            {isLoggedIn ? (
              <>
                {user.role === "admin" ? (
                  <>
                    <Button
                      as={Link}
                      to="/admin"
                      variant="outline-light"
                      size="sm"
                      style={{ borderRadius: 10, fontWeight: 700 }}
                    >
                      Admin
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      as={Link}
                      to="/dashboard"
                      variant="outline-light"
                      size="sm"
                      style={{ borderRadius: 10, fontWeight: 700 }}
                    >
                      Dashboard
                    </Button>
                  </>
                )}

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                  style={{ borderRadius: 10, fontWeight: 700 }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="light"
                size="sm"
                style={{ borderRadius: 10, fontWeight: 700 }}
              >
                Get started
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
