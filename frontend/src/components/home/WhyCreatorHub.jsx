import { Container, Row, Col, Card } from "react-bootstrap";

/**
 * CHANGE:
 * - Removed `import React from "react"`
 *   (not needed in modern React)
 */

/**
 * CHANGE:
 * - Removed artificial numeric `id`
 * - `title` is a stable unique key for static content
 */
const features = [
  {
    icon: "🚀",
    title: "Built for Speed",
    desc: "Publish assets instantly with powerful creator tools that stay out of your way.",
  },
  {
    icon: "💰",
    title: "Higher Earnings",
    desc: "Earn more with fair creator-first revenue models and transparent payouts.",
  },
  {
    icon: "🎨",
    title: "Premium Reach",
    desc: "Your assets get discovered by a global audience across teams and companies.",
  },
  {
    icon: "🔒",
    title: "Secure Delivery",
    desc: "Optimized file hosting, fast downloads, and reliable delivery every time.",
  },
];

/**
 * CHANGE:
 * - Extracted repeated card styles
 * - Avoids recreating objects on each render
 */
const cardStyle = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.006))",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 14,
  padding: 18,
};

const WhyCreatorHub = () => {
  return (
    <section className="py-4 py-md-5">
      <Container>
        <h2 style={{ color: "#fff", fontWeight: 800, marginBottom: 8 }}>
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
            <Col key={f.title} xs={12} sm={6} lg={3}>
              <Card className="h-100" style={cardStyle}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>
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
