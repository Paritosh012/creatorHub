import { useNavigate } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const isFree = product.price === 0;
  const isNew = product?.isNew;

  return (
    <Card
      role="button"
      aria-label={`Open product ${product.title}`}
      onClick={() => navigate(`/product/${product.slug}`)}
      className="h-100"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.15s ease, border-color 0.15s ease",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          paddingTop: "62%",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Badge */}
        {(isFree || isNew) && (
          <Badge
            bg=""
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "rgba(6,182,212,0.16)",
              color: "#06b6d4",
              borderRadius: 8,
              fontSize: 12,
              padding: "4px 8px",
              fontWeight: 600,
              backdropFilter: "blur(4px)",
            }}
          >
            {isFree ? "Free" : "New"}
          </Badge>
        )}
      </div>

      {/* Body */}
      <Card.Body style={{ padding: "14px 14px 16px" }}>
        <h6
          style={{
            color: "#fff",
            fontWeight: 700,
            marginBottom: 6,
            fontSize: 15,
            lineHeight: 1.2,
          }}
        >
          {product.title}
        </h6>

        <div
          style={{
            color: "#9ca3af",
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          by {product.creator?.name || "Unknown"}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 10,
            }}
          >
            {product.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 6,
                  padding: "2px 8px",
                  color: "#9ca3af",
                  fontSize: 11,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price + downloads */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: isFree ? "#06b6d4" : "#e6eef2",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {isFree ? "Free" : `₹${product.price}`}
          </div>

          {product.downloads && (
            <div style={{ color: "#9ca3af", fontSize: 12 }}>
              {product.downloads} downloads
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
