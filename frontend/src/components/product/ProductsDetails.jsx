import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug } from "../../services/productApi";
import { Button, Container, Row, Col, Spinner, Badge } from "react-bootstrap";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProductBySlug(slug);
        setProduct(res.data.product);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="light" />
      </div>
    );

  if (!product)
    return (
      <p style={{ color: "#9ca3af", textAlign: "center", marginTop: 40 }}>
        Product not found
      </p>
    );

  const isFree = product.price === 0;

  return (
    <Container style={{ paddingTop: 50, paddingBottom: 50 }}>
      <Row className="g-5">
        {/* LEFT: Preview */}
        <Col md={7}>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                height: 380,
                objectFit: "cover",
              }}
            />
          </div>

          {product.previewImages?.length > 0 && (
            <div className="d-flex gap-2 mt-3">
              {product.previewImages.slice(0, 3).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  style={{
                    width: 80,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
          )}
        </Col>

        {/* RIGHT: Info */}
        <Col md={5}>
          <Badge
            bg="secondary"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#9ca3af",
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            {product.category}
          </Badge>

          <h1 style={{ color: "#fff", fontWeight: 800, marginTop: 10 }}>
            {product.title}
          </h1>

          <p
            style={{
              color: "#9ca3af",
              fontSize: 15,
              lineHeight: 1.6,
              marginTop: 14,
            }}
          >
            {product.description}
          </p>

          {/* Price */}
          <div style={{ marginTop: 24 }}>
            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: isFree ? "#06b6d4" : "#e6eef2",
              }}
            >
              {isFree ? "Free" : `₹${product.price}`}
            </span>

            {!isFree && (
              <span style={{ color: "#9ca3af", marginLeft: 10 }}>
                one-time purchase
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="d-flex gap-3 mt-4">
            <Button
              size="lg"
              style={{
                borderRadius: 12,
                padding: "12px 22px",
                fontWeight: 600,
              }}
              onClick={() => navigate("/checkout", { state: product })}
            >
              {isFree ? "Download" : "Buy Now"}
            </Button>

            <Button
              variant="outline-light"
              size="lg"
              style={{
                borderRadius: 12,
                padding: "12px 22px",
                fontWeight: 600,
              }}
              onClick={() => navigate("/explore")}
            >
              Back
            </Button>
          </div>

          {/* Meta */}
          <div
            style={{
              marginTop: 30,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              color: "#9ca3af",
              fontSize: 14,
            }}
          >
            <div>Downloads: {product.downloads || 0}</div>
            <div>License: {product.licenseType || "personal"}</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
