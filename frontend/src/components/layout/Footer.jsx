import "../../styles/Footer.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const trendingTags = [
    "UI Kit",
    "Templates",
    "3D",
    "Icons",
    "Illustrations",
    "Figma",
  ];
 
  return (
    <footer
      style={{
          background:
          "linear-gradient(180deg, rgba(11,15,25,0.75), rgba(7,9,14,0.9))",
        color: "#d1d5db",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        marginTop: "60px",
        backdropFilter: "blur(8px)",
      }}
    >
      <Container style={{ paddingTop: 50, paddingBottom: 34 }}>
        {/* ========= TOP SECTION ========= */}
        <Row className="gy-5 align-items-start">
          {/* LEFT: Brand & Quick Upload */}
          <Col md={4}>
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none"
            >
              <div
                style={{
                  height: 44,
                  width: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                CH
              </div>

              <div style={{ marginLeft: 12 }}>
                <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
                  CreatorHub
                </div>
                <div style={{ color: "#9ca3af", fontSize: 13 }}>
                  Build. Sell. Inspire.
                </div>
              </div>
            </Link>

            <p
              style={{
                marginTop: 15,
                color: "#9ca3af",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              CreatorHub is the digital marketplace built for designers,
              developers, and creators to publish premium assets and grow their
              influence.
            </p>

            <Button
              variant="outline-light"
              size="sm"
              as={Link}
              to="/dashboard/create"
              style={{
                marginTop: 10,
                borderRadius: 10,
                padding: "6px 14px",
              }}
            >
              Quick Upload →
            </Button>
          </Col>

          {/* MIDDLE: Trending Tags */}
          <Col md={4}>
            <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: 12 }}>
              Trending Categories
            </h6>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {trendingTags.map((tag) => (
                <Badge
                  key={tag}
                  pill
                  as={Link}
                  to={`/explore?tag=${tag}`}
                  className="text-decoration-none"
                  bg=""
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    padding: "6px 10px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    fontWeight: 600,
                    borderRadius: 12,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p style={{ marginTop: 10, fontSize: 13, color: "#9ca3af" }}>
              Explore the most popular asset categories this week.
            </p>
          </Col>

          {/* RIGHT: Useful Links + Newsletter */}
          <Col md={4}>
            <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: 14 }}>
              Quick Links
            </h6>

            <div className="d-flex flex-column" style={{ gap: 6 }}>
              <Link
                to="/about"
                className="text-decoration-none"
                style={{ color: "#9ca3af" }}
              >
                About Us
              </Link>
              <Link
                to="/explore"
                className="text-decoration-none"
                style={{ color: "#9ca3af" }}
              >
                Explore Assets
              </Link>
              <Link
                to="/creators"
                className="text-decoration-none"
                style={{ color: "#9ca3af" }}
              >
                Top Creators
              </Link>
              <Link
                to="/pricing"
                className="text-decoration-none"
                style={{ color: "#9ca3af" }}
              >
                Pricing
              </Link>
            </div>

            <h6 style={{ marginTop: 20, color: "#fff", fontWeight: 700 }}>
              Stay Updated
            </h6>

            <Form
              onSubmit={(e) => e.preventDefault()}
              style={{ marginTop: 10 }}
            >
              <InputGroup>
                <Form.Control
                  className="subscribe"
                  placeholder="Your email"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#e5e7eb",
                  }}
                />
                <Button
                  variant="info"
                  style={{
                    background: "#06b6d4",
                    borderColor: "#06b6d4",
                    fontWeight: 700,
                  }}
                >
                  Join
                </Button>
              </InputGroup>
            </Form>

            <p style={{ marginTop: 8, color: "#9ca3af", fontSize: 12 }}>
              Get creator tips, updates & exclusive drops.
            </p>
          </Col>
        </Row>

        <Row style={{ marginTop: 30 }} className="align-items-center">
          <Col md={6}>
            <p style={{ color: "#6b7280", fontSize: 13 }}>
              © {new Date().getFullYear()} CreatorHub — All rights reserved.
            </p>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-md-end"
            style={{ gap: 18 }}
          >
            <Link
              to="/terms"
              className="text-decoration-none"
              style={{ color: "#9ca3af", fontSize: 13 }}
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-decoration-none"
              style={{ color: "#9ca3af", fontSize: 13 }}
            >
              Privacy
            </Link>
            <Link
              to="/support"
              className="text-decoration-none"
              style={{ color: "#9ca3af", fontSize: 13 }}
            >
              Support
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
