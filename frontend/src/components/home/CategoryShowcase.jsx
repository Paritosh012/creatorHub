import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * CHANGE:
 * - Removed artificial `id`
 * - `slug` is the real unique identifier
 * - This avoids identity confusion later
 */
const categories = [
  { name: "UI Kits", icon: "🎨", slug: "ui-kits" },
  { name: "Templates", icon: "📐", slug: "templates" },
  { name: "3D Assets", icon: "📦", slug: "3d-assets" },
  { name: "Icons", icon: "🔗", slug: "icons" },
  { name: "Illustrations", icon: "✨", slug: "illustrations" },
  { name: "Mockups", icon: "🖼️", slug: "mockups" },
];

/**
 * CHANGE:
 * - Extracted style objects outside component
 * - Prevents recreation on every render
 * - Easier future tweaks
 */
const cardStyle = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.006))",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 14,
  padding: 18,
  transition:
    "transform 0.15s ease, border-color 0.15s ease, background 0.15s ease",
};

const CategoryShowcase = () => {
  return (
    <section className="py-4 py-md-5">
      <Container>
        {/* Heading */}
        <h2 style={{ color: "#fff", fontWeight: 800, marginBottom: 8 }}>
          Explore Categories
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: 14,
            marginBottom: 24,
            maxWidth: 520,
          }}
        >
          Browse curated asset types made by top creators.
        </p>

        {/* Grid */}
        <Row className="g-3 g-md-4">
          {categories.map((cat) => (
            <Col key={cat.slug} xs={12} sm={6} lg={4}>
              {/* CHANGE:
                  - key uses `slug` (stable, meaningful)
                  - Card remains clickable via Link
              */}
              <Card
                as={Link}
                to={`/explore?category=${cat.slug}`}
                className="text-decoration-none h-100"
                style={cardStyle}
              >
                {/* Icon */}
                <div style={{ fontSize: 34, marginBottom: 10 }}>
                  {cat.icon}
                </div>

                {/* Title */}
                <h5
                  style={{
                    marginBottom: 6,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  {cat.name}
                </h5>

                {/* Description */}
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: 13,
                    lineHeight: 1.45,
                    marginBottom: 0,
                  }}
                >
                  Discover the best {cat.name.toLowerCase()} on CreatorHub.
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CategoryShowcase;
