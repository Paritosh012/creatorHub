import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

/**
 * WhyCreatorHub.jsx
 * Premium 3–4 feature cards explaining CreatorHub's value.
 * Matches the site's dark-glass tone and spacing rhythm.
 */

const features = [
  {
    id: 1,
    icon: "🚀",
    title: "Built for Speed",
    desc: "Publish assets instantly with powerful creator tools that stay out of your way.",
  },
  {
    id: 2,
    icon: "💰",
    title: "Higher Earnings",
    desc: "Earn more with fair creator-first revenue models and transparent payouts.",
  },
  {
    id: 3,
    icon: "🎨",
    title: "Premium Reach",
    desc: "Your assets get discovered by a global audience across teams and companies.",
  },
  {
    id: 4,
    icon: "🔒",
    title: "Secure Delivery",
    desc: "Optimized file hosting, fast downloads, and reliable delivery every time.",
  },
];

const WhyCreatorHub = () => {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 56 }}>
      <Container>
        <h2 style={{ color: "#fff", fontWeight: 800, marginBottom: 10 }}>
          Why CreatorHub?
        </h2>

        <p style={{ color: "#9ca3af", marginBottom: 32, fontSize: 14 }}>
          A platform designed for creators and loved by teams.
        </p>

        <Row className="g-4">
          {features.map((f) => (
            <Col key={f.id} xs={12} sm={6} lg={3}>
              <Card
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.006))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: 20,
                  height: "100%",
                  transition: "0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.06)";
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                <div style={{ fontSize: 36 }}>{f.icon}</div>

                <h5
                  style={{
                    marginTop: 14,
                    marginBottom: 6,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {f.title}
                </h5>

                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: 13,
                    marginBottom: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {f.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyCreatorHub;
