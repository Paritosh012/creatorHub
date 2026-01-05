import { Card } from "react-bootstrap";

/**
 * SkeletonCard
 * - Matches ProductCard size
 * - No colors changed (uses existing glass look)
 * - Pure placeholder, no logic
 */
const SkeletonCard = () => {
  return (
    <Card
      className="h-100"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div
        style={{
          paddingTop: "62%",
          background: "rgba(255,255,255,0.04)",
        }}
      />

      <Card.Body>
        <div
          style={{
            height: 14,
            width: "80%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 6,
            marginBottom: 10,
          }} 
        />

        <div
          style={{
            height: 12,
            width: "60%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 6,
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default SkeletonCard;
