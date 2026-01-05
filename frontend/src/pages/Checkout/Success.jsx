import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  // CHANGE: guard direct access
  useEffect(() => {
    if (!location.state?.fromCheckout) {
      navigate("/explore");
      return;
    }

    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t); // CHANGE: cleanup
  }, [location.state, navigate]);

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
          transform: show ? "scale(1)" : "scale(0.94)",
          opacity: show ? 1 : 0,
          transition: "0.4s ease",
        }}
      >
        <Card.Body style={{ padding: "32px 26px" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>

          <h2
            style={{
              color: "#fff",
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Payment Successful
          </h2>

          <p
            style={{
              color: "#9ca3af",
              fontSize: 15,
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            Thank you for your purchase.  
            Your asset is ready to use.
          </p>

          <Button
            style={{
              padding: "10px 24px",
              fontWeight: 600,
              borderRadius: 10,
            }}
            onClick={() => navigate("/explore")}
          >
            Back to Explore
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Success;
