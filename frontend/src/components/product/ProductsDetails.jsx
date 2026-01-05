import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug } from "../../services/productApi";
import { Button, Container, Row, Col, Badge } from "react-bootstrap";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductBySlug(slug);
        if (!res?.data?.product) throw new Error();
        setProduct(res.data.product);
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <Container className="py-5">
        <Row className="g-4">
          <Col md={7}>
            <div
              style={{
                height: 360,
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
              }}
            />
          </Col>
          <Col md={5}>
            <div
              style={{
                height: 24,
                width: "60%",
                background: "rgba(255,255,255,0.08)",
                marginBottom: 12,
              }}
            />
            <div
              style={{
                height: 14,
                width: "90%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <p style={{ color: "#9ca3af", textAlign: "center", marginTop: 40 }}>
        {error || "Product not found"}
      </p>
    );
  }

  const isFree = product.price === 0;

  return (
    <Container className="py-4 py-md-5">
      <Row className="g-4 g-md-5">
        <Col md={7}>
          <img
            src={
              product.thumbnail ||
              "https://picsum.photos/seed/product/900/600"
            }
            alt={product.title}
            style={{ width: "100%", borderRadius: 16 }}
          />
        </Col>

        <Col md={5}>
          <Badge
            bg=""
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#9ca3af",
            }}
          >
            {product.category}
          </Badge>

          <h1 style={{ color: "#fff", fontWeight: 800, marginTop: 10 }}>
            {product.title}
          </h1>

          <p style={{ color: "#9ca3af", marginTop: 14 }}>
            {product.description}
          </p>

          <div style={{ marginTop: 22 }}>
            <span
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: isFree ? "#06b6d4" : "#e6eef2",
              }}
            >
              {isFree ? "Free" : `₹${product.price}`}
            </span>
          </div>

          <div className="d-flex gap-3 mt-4">
            <Button
              size="lg"
              onClick={() => navigate("/checkout", { state: product })}
            >
              {isFree ? "Download" : "Buy Now"}
            </Button>

            <Button
              variant="outline-light"
              size="lg"
              onClick={() => navigate("/explore")}
            >
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
