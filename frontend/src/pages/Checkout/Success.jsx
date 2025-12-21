import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          transform: show ? "scale(1)" : "scale(0.9)",
          opacity: show ? 1 : 0,
          transition: "0.4s ease",
        }}
      >
        <div
          style={{
            fontSize: 60,
            marginBottom: 10,
          }}
        >
          ✅
        </div>

        <h2 style={{ color: "#fff", fontWeight: 800 }}>
          Payment Successful
        </h2>

        <p style={{ color: "#9ca3af", marginTop: 10 }}>
          Thank you for your purchase.  
          Your asset is ready.
        </p>

        <Button
          style={{
            marginTop: 25,
            padding: "10px 24px",
            fontWeight: 600,
            borderRadius: 10,
          }}
          onClick={() => navigate("/explore")}
        >
          Back to Explore
        </Button>
      </div>
    </div>
  );
};

export default Success;
