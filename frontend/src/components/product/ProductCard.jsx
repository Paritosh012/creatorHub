import { useNavigate } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const {
    slug,
    title,
    thumbnail,
    price,
    tags = [],
    downloads,
    creator,
  } = product;

  const isFree = price === 0;
  const isNew = product?.isNew;

  const handleOpenProduct = () => {
    navigate(`/product/${slug}`);
  };

  const handleOpenCreator = (e) => {
    e.stopPropagation();
    if (creator?._id) {
      navigate(`/creator/${creator._id}`);
    }
  };

  return (
    <Card
      role="button"
      aria-label={`Open product ${title}`}
      onClick={handleOpenProduct}
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
          src={thumbnail}
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

        {(isFree || isNew) && (
          <Badge
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
          {title}
        </h6>

        <div
          style={{ color: "#9ca3af", fontSize: 13 }}
          onClick={handleOpenCreator}
        >
          by {creator?.name || "Unknown"}
        </div>

        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 10,
            }}
          >
            {tags.slice(0, 3).map((tag, i) => (
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
            {isFree ? "Free" : `₹${price}`}
          </div>

          {downloads > 0 && (
            <div style={{ color: "#9ca3af", fontSize: 12 }}>
              {downloads} downloads
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
