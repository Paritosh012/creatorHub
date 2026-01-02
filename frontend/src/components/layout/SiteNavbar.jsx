import "../../styles/Footer.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const SiteNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  /* ---------------- CHECK AUTH FROM BACKEND ---------------- */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, [location.pathname]);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      localStorage.clear();
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      sticky="top"
      className="py-2"
      style={{
        background:
          "linear-gradient(180deg, rgba(11,15,25,0.75), rgba(7,9,14,0.9))",
        backdropFilter: "saturate(120%) blur(6px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <Container fluid="lg">
        {/* BRAND */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <div
            style={{
              height: 38,
              width: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            CH
          </div>

          <div className="d-none d-sm-block" style={{ lineHeight: 1 }}>
            <div style={{ fontWeight: 700, color: "#fff" }}>CreatorHub</div>
            <small style={{ color: "#9ca3af", fontSize: 11 }}>
              Build • Sell • Inspire
            </small>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          {/* LEFT LINKS */}
          <Nav className="me-auto mt-3 mt-lg-0 gap-2">
            <Nav.Link as={Link} to="/explore">
              Explore
            </Nav.Link>

            {user && (
              <Nav.Link as={Link} to="/dashboard">
                Creator
              </Nav.Link>
            )}
          </Nav>

          {/* RIGHT ACTIONS */}
          <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
            {user ? (
              <>
                {user.role === "admin" ? (
                  <Button
                    as={Link}
                    to="/admin"
                    variant="outline-light"
                    size="sm"
                    className="fw-semibold"
                    style={{ borderRadius: 10 }}
                  >
                    Admin
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    to="/dashboard"
                    variant="outline-light"
                    size="sm"
                    className="fw-semibold"
                    style={{ borderRadius: 10 }}
                  >
                    Dashboard
                  </Button>
                )}

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                  className="fw-semibold"
                  style={{ borderRadius: 10 }}
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
                className="fw-semibold"
                style={{ borderRadius: 10 }}
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
