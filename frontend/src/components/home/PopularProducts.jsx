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
        setProducts(res.data.products);
      } catch {
        setProducts(productsList);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section
      aria-label="Popular assets"
      className="py-4 py-md-5"
    >
      <Container>
        {/* Header */}
        <Row className="align-items-start align-items-md-center mb-3">
          <Col>
            <h2 style={{ color: "#fff", fontWeight: 800, marginBottom: 6 }}>
              Trending This Week
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 14,
                marginBottom: 0,
                maxWidth: 520,
              }}
            >
              Hand-picked digital assets trending on CreatorHub.
            </p>
          </Col>

          <Col
            xs={12}
            md="auto"
            className="mt-2 mt-md-0"
          >
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
          <Row className="g-3 g-md-4">
            {products.map((p) => (
              <Col key={p.id} xs={12} sm={6} lg={3}>
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
      className="h-100 card-glass text-decoration-none"
      style={{
        overflow: "hidden",
        transition: "transform 0.15s ease, border-color 0.15s ease",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          paddingTop: "62%",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <img
          src={thumbnail || `https://picsum.photos/seed/p-${id}/800/560`}
          alt={title}
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <Card.Body style={{ padding: "14px 14px 16px" }}>
        <Card.Title
          style={{
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            marginBottom: 6,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Card.Title>

        <div className="d-flex justify-content-between align-items-center">
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            {creator}
          </div>
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
      padding: 24,
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.005))",
      border: "1px solid rgba(255,255,255,0.04)",
      color: "var(--muted)",
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: 17,
        fontWeight: 700,
        color: "#fff",
        marginBottom: 6,
      }}
    >
      No products found
    </div>
    <div style={{ fontSize: 14 }}>
      We couldn't load popular assets right now — try again later.
    </div>
  </div>
);

export default PopularProducts;
