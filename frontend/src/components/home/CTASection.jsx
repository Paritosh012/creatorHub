import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * CTASection.jsx
 * Final call-to-action section with premium dark-glass style.
 * No logic — purely presentational.
 */

const CTASection = () => {
  return (
    <section
      style={{
        paddingTop: 56,
        paddingBottom: 56,
      }}
    >
      <Container
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.006))",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "40px 32px",
          textAlign: "center",
          transition: "0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          Join CreatorHub today
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: 15,
            marginBottom: 26,
            maxWidth: 480,
            marginInline: "auto",
          }}
        >
          Discover premium assets or start selling your own creations to a
          global audience — all in one place.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            as={Link}
            to="/explore"
            variant="light"
            style={{
              padding: "10px 22px",
              fontWeight: 700,
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
            style={{
              padding: "10px 22px",
              fontWeight: 700,
              borderRadius: 12,
              borderColor: "rgba(255,255,255,0.20)",
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
