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
        backdropFilter: "blur(8px)",
      }}
    >
      <Container className="py-4 py-md-5">
        {/* TOP */}
        <Row className="gy-4">
          {/* BRAND */}
          <Col md={4}>
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none gap-2"
            >
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
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                CH
              </div>

              <div>
                <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>
                  CreatorHub
                </div>
                <div style={{ color: "#9ca3af", fontSize: 12 }}>
                  Build. Sell. Inspire.
                </div>
              </div>
            </Link>

            <p
              style={{
                marginTop: 12,
                color: "#9ca3af",
                fontSize: 14,
                lineHeight: 1.5,
                maxWidth: 420,
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
                marginTop: 8,
                borderRadius: 10,
                padding: "6px 14px",
                fontWeight: 600,
              }}
            >
              Quick Upload →
            </Button>
          </Col>

          {/* TAGS */}
          <Col md={4}>
            <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: 10 }}>
              Trending Categories
            </h6>

            <div className="d-flex flex-wrap gap-2">
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
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p style={{ marginTop: 8, fontSize: 13, color: "#9ca3af" }}>
              Explore the most popular asset categories this week.
            </p>
          </Col>

          {/* LINKS + NEWSLETTER */}
          <Col md={4}>
            <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: 12 }}>
              Quick Links
            </h6>

            <div className="d-flex flex-column gap-1">
              <Link to="/about" className="text-decoration-none text-muted">
                About Us
              </Link>
              <Link to="/explore" className="text-decoration-none text-muted">
                Explore Assets
              </Link>
              <Link to="/creators" className="text-decoration-none text-muted">
                Top Creators
              </Link>
              <Link to="/pricing" className="text-decoration-none text-muted">
                Pricing
              </Link>
            </div>

            <h6
              style={{
                marginTop: 18,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Stay Updated
            </h6>

            <Form
              onSubmit={(e) => e.preventDefault()}
              style={{ marginTop: 8, maxWidth: 360 }}
            >
              <InputGroup>
                <Form.Control
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

            <p style={{ marginTop: 6, color: "#9ca3af", fontSize: 12 }}>
              Get creator tips, updates & exclusive drops.
            </p>
          </Col>
        </Row>

        {/* BOTTOM */}
        <Row className="mt-4 align-items-center gy-2">
          <Col xs={12} md={6}>
            <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 0 }}>
              © {new Date().getFullYear()} CreatorHub — All rights reserved.
            </p>
          </Col>

          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-md-end gap-3"
          >
            <Link to="/terms" className="text-decoration-none text-muted">
              Terms
            </Link>
            <Link to="/privacy" className="text-decoration-none text-muted">
              Privacy
            </Link>
            <Link to="/support" className="text-decoration-none text-muted">
              Support
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
