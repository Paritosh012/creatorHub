import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPopularProducts } from "../../services/productApi";
import ProductCard from "../../components/product/ProductCard";

/**
 * CHANGE:
 * - Removed mock `productsList`
 * - Fake data hides real API problems
 * - EmptyState should be shown instead
 */

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getPopularProducts();

        /**
         * CHANGE:
         * - Defensive check
         * - Prevents crashes if backend response changes
         */
        setProducts(Array.isArray(res.data.products) ? res.data.products : []);
      } catch {
        /**
         * CHANGE:
         * - Do NOT silently fake data
         * - Show empty/error state instead
         */
        setError(true);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section aria-label="Popular assets" className="py-4 py-md-5">
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

          <Col xs={12} md="auto" className="mt-2 mt-md-0">
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

        {products.length === 0 ? (
          <EmptyState isError={error} />
        ) : (
          <Row className="g-3 g-md-4">
            {products.map((p) => (
              /**
               * CHANGE:
               * - Use `_id` as key
               * - ProductCard handles routing via `slug`
               */
              <Col key={p._id} xs={12} sm={6} lg={3}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

const EmptyState = ({ isError }) => (
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
      {isError ? "Failed to load products" : "No products found"}
    </div>
    <div style={{ fontSize: 14 }}>
      {isError
        ? "Please try again later."
        : "No trending assets available right now."}
    </div>
  </div>
);

export default PopularProducts;
