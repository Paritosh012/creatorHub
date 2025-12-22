import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);

  if (!state) return <p>No product selected</p>;

  const handlePayment = () => {
    setProcessing(true);

    // fake payment delay
    setTimeout(() => {
      setProcessing(false);

      toast.success("Payment successful 🎉");

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
    </Container>
  );
};

export default Checkout;
