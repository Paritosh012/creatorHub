import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <section
      aria-label="Hero"
      style={{
        background:
          "linear-gradient(180deg, rgba(11,15,25,0.96), rgba(7,9,14,1))",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        paddingTop: 56,
        paddingBottom: 56,
        margin: "10px 0",
      }}
    >
      <Container>
        <Row className="align-items-center gy-4">
          {/* Left: copy + CTAs */}
          <Col lg={6}>
            <div style={{ maxWidth: 680 }}>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "2.25rem",
                  lineHeight: 1.05,
                  fontWeight: 800,
                }}
              >
                Digital assets built by creators.{" "}
                <span style={{ color: "#06b6d4" }}>Loved by teams.</span>
              </h1>

              <p style={{ color: "#9ca3af", marginTop: 14, fontSize: 16 }}>
                Discover premium UI kits, templates, icons, 3D assets and more —
                support creators directly and ship faster.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 22,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  as={Link}
                  to="/explore"
                  variant="info"
                  style={{
                    background: "#06b6d4",
                    borderColor: "#06b6d4",
                    fontWeight: 700,
                    borderRadius: 10,
                    padding: "10px 18px",
                  }}
                >
                  Explore Assets
                </Button>

                <Button
                  as={Link}
                  to="/dashboard/create"
                  variant="outline-light"
                  style={{
                    borderRadius: 10,
                    fontWeight: 700,
                    padding: "10px 18px",
                    borderColor: "rgba(255,255,255,0.12)",
                  }}
                >
                  Quick Upload
                </Button>

                <Button
                  as={Link}
                  to="/become-a-creator"
                  variant="light"
                  style={{
                    background: "white",
                    color: "#0b0f19",
                    fontWeight: 700,
                    borderRadius: 10,
                    padding: "10px 14px",
                  }}
                >
                  Become a Creator
                </Button>
              </div>

              {/* micro-stats */}
              <div
                style={{
                  display: "flex",
                  gap: 18,
                  marginTop: 20,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Stat label="Creators" value="1.2k" />
                <Stat label="Assets" value="8.3k" />
                <Stat label="Trusted" value="4.6k teams" />
              </div>
            </div>
          </Col>

          {/* Right: hero visual card */}
          <Col lg={6}>
            <div
              style={{
                borderRadius: 16,
                padding: 18,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 6px 30px rgba(2,6,23,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 300,
              }}
            >
              {/* Placeholder image — replace with your hero art */}
              <img
                src="https://picsum.photos/seed/creatorhub-hero/900/560"
                alt="CreatorHub hero preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
                loading="lazy"
              />
            </div>

            {/* quick tag row under image */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <Badge pill style={badgeStyle} as={Link} to="/explore?tag=ui-kit">
                UI Kits
              </Badge>
              <Badge
                pill
                style={badgeStyle}
                as={Link}
                to="/explore?tag=templates"
              >
                Templates
              </Badge>
              <Badge pill style={badgeStyle} as={Link} to="/explore?tag=icons">
                Icons
              </Badge>
              <Badge pill style={badgeStyle} as={Link} to="/explore?tag=3d">
                3D
              </Badge>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Stat = ({ label, value }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ fontWeight: 800, color: "#fff" }}>{value}</div>
    <div style={{ fontSize: 12, color: "#9ca3af" }}>{label}</div>
  </div>
);

const badgeStyle = {
  background: "rgba(255,255,255,0.03)",
  color: "#e6eef2",
  border: "1px solid rgba(255,255,255,0.04)",
  padding: "6px 10px",
  borderRadius: 999,
  textDecoration: "none",
  fontWeight: 700,
};

export default HomeHero;
