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
        paddingTop: 64,
        paddingBottom: 64,
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
                  fontSize: "2.4rem",
                  lineHeight: 1.1,
                  fontWeight: 800,
                }}
              >
                A Premium Marketplace for Creators to Sell Digital Assets
              </h1>

              <p
                style={{
                  color: "#9ca3af",
                  marginTop: 16,
                  fontSize: 16,
                }}
              >
                Turn your passion into a digital product. Discover and sell
                high-quality UI kits, templates, icons, and creative assets
                built by creators, for creators.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 26,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  as={Link}
                  to="/explore"
                  style={{
                    background: "#06b6d4",
                    borderColor: "#06b6d4",
                    fontWeight: 700,
                    borderRadius: 10,
                    padding: "10px 20px",
                  }}
                >
                  Explore Assets
                </Button>

                <Button
                  as={Link}
                  to="/become-a-creator"
                  variant="outline-light"
                  style={{
                    borderRadius: 10,
                    fontWeight: 700,
                    padding: "10px 18px",
                    borderColor: "rgba(255,255,255,0.14)",
                  }}
                >
                  Become a Creator
                </Button>
              </div>
            </div>
          </Col>

          {/* Right: hero visual */}
          <Col lg={6}>
            <div
              style={{
                borderRadius: 16,
                padding: 18,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 6px 30px rgba(2,6,23,0.6)",
              }}
            >
              <img
                src="https://picsum.photos/seed/creatorhub-hero/900/560"
                alt="CreatorHub marketplace preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
                loading="lazy"
              />
            </div>

            {/* tags */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 14,
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
                3D Assets
              </Badge>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const badgeStyle = {
  background: "rgba(255,255,255,0.04)",
  color: "#e6eef2",
  border: "1px solid rgba(255,255,255,0.06)",
  padding: "6px 12px",
  borderRadius: 999,
  textDecoration: "none",
  fontWeight: 700,
};

export default HomeHero;
