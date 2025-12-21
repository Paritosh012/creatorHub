import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "UI Kits", icon: "🎨", slug: "ui-kits" },
  { id: 2, name: "Templates", icon: "📐", slug: "templates" },
  { id: 3, name: "3D Assets", icon: "📦", slug: "3d-assets" },
  { id: 4, name: "Icons", icon: "🔗", slug: "icons" },
  { id: 5, name: "Illustrations", icon: "✨", slug: "illustrations" },
  { id: 6, name: "Mockups", icon: "🖼️", slug: "mockups" },
];

const CategoryShowcase = () => {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 56 }}>
      <Container>
        {/* Heading */}
        <h2 style={{ color: "#fff", fontWeight: 800, marginBottom: 10 }}>
          Explore Categories
        </h2>

        <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>
          Browse curated asset types made by top creators.
        </p>

        {/* Grid */}
        <Row className="g-4">
          {categories.map((cat) => (
            <Col key={cat.id} xs={12} sm={6} md={4} lg={4}>
              <Card
                as={Link}
                to={`/explore?category=${cat.slug}`}
                className="text-decoration-none h-100"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.006))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: 20,
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                {/* Icon */}
                <div style={{ fontSize: 36 }}>{cat.icon}</div>

                {/* Title */}
                <h5
                  style={{
                    marginTop: 14,
                    marginBottom: 6,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {cat.name}
                </h5>

                {/* Description */}
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: 13,
                    lineHeight: 1.4,
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
