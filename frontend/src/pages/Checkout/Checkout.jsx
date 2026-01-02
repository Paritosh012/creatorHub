import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Spinner, Card } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  if (!state)
    return (
      <Container className="py-5 text-center">
        <p style={{ color: "#9ca3af" }}>No product selected.</p>
        <Button
          variant="outline-light"
          onClick={() => navigate("/explore")}
        >
          Back to Explore
        </Button>
      </Container>
    );

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      toast.success("Payment successful 🎉");

      setTimeout(() => {
        navigate("/success");
      }, 1500);
    }, 2000);
  };

  return (
    <Container className="py-4 py-md-5 d-flex justify-content-center">
      <Card
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 520,
        }}
      >
        <Card.Body style={{ padding: "24px 22px" }}>
          <h3
            style={{
              color: "#fff",
              fontWeight: 800,
              marginBottom: 20,
            }}
          >
            Checkout
          </h3>

          {/* Product summary */}
          <div
            style={{
              paddingBottom: 16,
              marginBottom: 16,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h5 style={{ color: "#fff", marginBottom: 4 }}>
              {state.title}
            </h5>
            <div style={{ color: "#9ca3af", fontSize: 14 }}>
              {state.category}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#9ca3af", fontSize: 13 }}>
              Total amount
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: state.price === 0 ? "#06b6d4" : "#e6eef2",
              }}
            >
              {state.price === 0 ? "Free" : `₹${state.price}`}
            </div>
          </div>

          {/* CTA */}
          <Button
            disabled={processing}
            onClick={handlePayment}
            className="w-100"
            style={{
              padding: "12px 0",
              fontWeight: 600,
              borderRadius: 10,
            }}
          >
            {processing ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <Spinner size="sm" animation="border" />
                Processing…
              </span>
            ) : (
              "Confirm & Pay"
            )}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Checkout;
