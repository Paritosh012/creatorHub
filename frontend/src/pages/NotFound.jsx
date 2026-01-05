import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card
        style={{
          maxWidth: 420,
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          textAlign: "center",
        }}
      >
        <Card.Body style={{ padding: "32px 26px" }}>
          {/* CHANGE: meaningful visual instead of plain text */}
          <div style={{ fontSize: 56, marginBottom: 12 }}>🚫</div>

          <h2
            style={{
              color: "#fff",
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Page Not Found
          </h2>

          <p
            style={{
              color: "#9ca3af",
              fontSize: 15,
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            The page you’re looking for doesn’t exist or was moved.
          </p>

          {/* CHANGE: recovery action */}
          <Button
            variant="outline-light"
            style={{
              padding: "10px 22px",
              fontWeight: 600,
              borderRadius: 10,
            }}
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFound;
