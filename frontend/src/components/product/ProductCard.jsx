import React from "react";
import { Card, Badge } from "react-bootstrap";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const isFree = product.price === 0;
  const isNew = product?.isNew;

  return (
    <Card
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        transition: "0.25s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.05)";
      }}
    >
      {/* Thumbnail + overlay */}
      <div style={{ width: "100%", height: 170, position: "relative" }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* NEW / FREE Badge */}
        {(isFree || isNew) && (
          <Badge
            bg="info"
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              backdropFilter: "blur(4px)",
              background: "rgba(6,182,212,0.16)",
              color: "#06b6d4",
              borderRadius: 8,
              fontSize: 12,
              padding: "4px 8px",
              fontWeight: 600,
            }}
          >
            {isFree ? "Free" : "New"}
          </Badge>
        )}

        {/* Hover overlay */}
        <div
          className="hover-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e6eef2",
            fontSize: 14,
            fontWeight: 500,
            transition: "0.25s ease",
          }}
        >
          View details →
        </div>
      </div>

      {/* Show overlay on hover */}
      <style>
        {`
        .hover-overlay:hover {
          opacity: 1 !important;
        }
      `}
      </style>

      {/* Card Body */}
      <Card.Body style={{ padding: 14 }}>
        <h6
          style={{
            color: "#fff",
            fontWeight: 700,
            marginBottom: 6,
            fontSize: 15,
            lineHeight: "1.2",
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
          by {product.creator}
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
                  background: "rgba(255,255,255,0.03)",
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

        {/* Price + Downloads */}
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
              fontWeight: 600,
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
