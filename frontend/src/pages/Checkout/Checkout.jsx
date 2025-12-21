import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Spinner, Toast } from "react-bootstrap";
import { useState } from "react";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!state) return <p>No product selected</p>;

  const handlePayment = () => {
    setProcessing(true);

    // fake payment delay
    setTimeout(() => {
      setProcessing(false);
      setShowToast(true);

      // redirect after toast
      setTimeout(() => {
        navigate("/success");
      }, 1500);
    }, 2000);
  };

  return (
    <Container style={{ paddingTop: 60, maxWidth: 600 }}>
      <h3 style={{ color: "#fff", marginBottom: 20 }}>Checkout</h3>

      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          padding: 20,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h5>{state.title}</h5>
        <p style={{ color: "#9ca3af" }}>{state.category}</p>

        <h4 style={{ marginTop: 10 }}>
          {state.price === 0 ? "Free" : `₹${state.price}`}
        </h4>

        <Button
          disabled={processing}
          onClick={handlePayment}
          style={{
            marginTop: 20,
            width: "100%",
            padding: "12px 0",
            fontWeight: 600,
            borderRadius: 10,
          }}
        >
          {processing ? (
            <>
              <Spinner size="sm" animation="border" /> Processing…
            </>
          ) : (
            "Confirm & Pay"
          )}
        </Button>
      </div>

      {/* TOAST */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={1500}
        autohide
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "rgba(0,0,0,0.85)",
          color: "#fff",
          borderRadius: 10,
        }}
      >
        <Toast.Body>Payment successful 🎉</Toast.Body>
      </Toast>
    </Container>
  );
};

export default Checkout;
