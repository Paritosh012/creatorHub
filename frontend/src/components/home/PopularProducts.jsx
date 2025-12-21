import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPopularProducts } from "../../services/productApi";

const productsList = [
  {
    id: 1,
    title: "Minimal UI Kit",
    creator: "Asha",
    price: 499,
    thumbnail: "https://picsum.photos/seed/p1/500/400",
  },
  {
    id: 2,
    title: "3D Icons Pack",
    creator: "Ravi",
    price: 299,
    thumbnail: "https://picsum.photos/seed/p2/500/400",
  },
  {
    id: 3,
    title: "Dashboard Template",
    creator: "Maya",
    price: 0,
    thumbnail: "https://picsum.photos/seed/p3/500/400",
  },
  {
    id: 4,
    title: "Figma Wireframe Kit",
    creator: "Dev",
    price: 199,
    thumbnail: "https://picsum.photos/seed/p4/500/400",
  },
];

  const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await getPopularProducts();
        setProducts(response.data.products);
      } catch {
        setProducts(productsList);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section
      aria-label="Popular assets"
      style={{
        paddingTop: 56,
        paddingBottom: 56,
        background: "transparent",
      }}
    >
      <Container>
        <Row className="align-items-center mb-3">
          <Col>
            <h2 style={{ color: "#fff", fontWeight: 800 }}>
              Trending This Week
            </h2>
            <p
              style={{ color: "var(--muted)", marginBottom: 24, fontSize: 14 }}
            >
              Hand-picked digital assets trending on CreatorHub.
            </p>
          </Col>
          <Col xs="auto">
            <Link
              to="/explore"
              style={{
                color: "#06b6d4",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              View all →
            </Link>
          </Col>
        </Row>

        {!products || products.length === 0 ? (
          <EmptyState />
        ) : (
          <Row className="g-4">
            {products.map((p) => (
              <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

const ProductCard = ({ product }) => {
  const { id, title, creator, price, thumbnail } = product;

  return (
    <Card
      as={Link}
      to={`/product/${id}`}
      aria-label={`Open product ${title}`}
      className="h-100 card-glass"
      style={{
        overflow: "hidden",
        color: "inherit",
        textDecoration: "none",
        transition: "transform 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* image wrapper (preserves ratio, rounded corners handled by overflow) */}
      <div
        style={{
          position: "relative",
          paddingTop: "60%",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <img
          src={thumbnail || `https://picsum.photos/seed/p-${id}/800/560`}
          alt={title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          loading="lazy"
        />
      </div>

      <Card.Body style={{ padding: "12px 14px" }}>
        <Card.Title
          style={{
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            marginBottom: 6,
            lineHeight: 1.15,
          }}
        >
          {title}
        </Card.Title>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "var(--muted)", fontSize: 13 }}>{creator}</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>
            {price === 0 ? "Free" : `₹${price}`}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const EmptyState = () => (
  <div
    role="status"
    style={{
      borderRadius: 12,
      padding: 28,
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))",
      border: "1px solid rgba(255,255,255,0.04)",
      color: "var(--muted)",
      textAlign: "center",
    }}
  >
    <div
      style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}
    >
      No products found
    </div>
    <div style={{ fontSize: 14 }}>
      We couldn't load popular assets right now — try again later.
    </div>
  </div>
);

export default PopularProducts;
