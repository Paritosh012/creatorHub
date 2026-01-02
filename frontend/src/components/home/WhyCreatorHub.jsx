import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

/**
 * WhyCreatorHub.jsx
 * UI-only polish for mobile responsiveness and touch UX.
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
    <section className="py-4 py-md-5">
      <Container>
        <h2
          style={{
            color: "#fff",
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          Why CreatorHub?
        </h2>

        <p
          style={{
            color: "#9ca3af",
            marginBottom: 28,
            fontSize: 14,
            maxWidth: 520,
          }}
        >
          A platform designed for creators and loved by teams.
        </p>

        <Row className="g-3 g-md-4">
          {features.map((f) => (
            <Col key={f.id} xs={12} sm={6} lg={3}>
              <Card
                className="h-100"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.006))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    marginBottom: 10,
                  }}
                >
                  {f.icon}
                </div>

                <h5
                  style={{
                    marginBottom: 6,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  {f.title}
                </h5>

                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: 13,
                    marginBottom: 0,
                    lineHeight: 1.45,
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
