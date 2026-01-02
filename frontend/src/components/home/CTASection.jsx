import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-4 py-md-5">
      <Container
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.006))",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "28px 20px",
          textAlign: "center",
          transition: "border-color 0.2s ease",
        }}
        className="px-sm-4 py-sm-4 px-md-5 py-md-4"
      >
        <h2
          style={{
            color: "#fff",
            fontWeight: 800,
            marginBottom: 10,
            fontSize: 22,
          }}
          className="fs-md-2"
        >
          Join CreatorHub today
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: 14,
            marginBottom: 22,
            maxWidth: 520,
            marginInline: "auto",
            lineHeight: 1.5,
          }}
        >
          Discover premium assets or start selling your own creations to a
          global audience — all in one place.
        </p>

        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <Button
            as={Link}
            to="/explore"
            variant="light"
            className="fw-semibold"
            style={{
              padding: "10px 22px",
              borderRadius: 12,
              color: "#0b0f19",
            }}
          >
            Explore Assets
          </Button>

          <Button
            as={Link}
            to="/become-a-creator"
            variant="outline-light"
            className="fw-semibold"
            style={{
              padding: "10px 22px",
              borderRadius: 12,
              borderColor: "rgba(255,255,255,0.25)",
            }}
          >
            Become a Creator
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
