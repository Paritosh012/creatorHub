import { Container, Row, Col, Button, Badge, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const HomeHero = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);

  const isCreator = user?.role === "creator";

  const handleBecomeCreator = async () => {
    try {
      const res = await api.put("/users/become-creator");

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("You are now a creator 🚀");
        setShowModal(false);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      toast.error("Failed to become creator");
    }
  };

  return (
    <>
      <section
        aria-label="Hero"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,15,25,0.96), rgba(7,9,14,1))",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <Container>
          <Row className="align-items-center gy-4">
            <Col lg={6}>
              <h1 style={{ color: "#fff", fontWeight: 800 }}>
                A Premium Marketplace for Creators
              </h1>

              <p style={{ color: "#9ca3af", marginTop: 16 }}>
                Sell UI kits, templates, icons, and digital assets.
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
                <Button as={Link} to="/explore">
                  Explore Assets
                </Button>

                {user ? (
                  isCreator ? (
                    <Button onClick={() => navigate("/admin")}>
                      Upload your product
                    </Button>
                  ) : (
                    <Button
                      variant="outline-light"
                      onClick={() => setShowModal(true)}
                    >
                      Become a Creator
                    </Button>
                  )
                ) : (
                  <Button
                    variant="outline-light"
                    onClick={() => navigate("/login")}
                  >
                    Become a Creator
                  </Button>
                )}
              </div>
            </Col>

            <Col lg={6}>
              <img
                src="https://picsum.photos/seed/creatorhub-hero/900/560"
                alt="CreatorHub preview"
                style={{ width: "100%", borderRadius: 12 }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Become a Creator</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            As a creator, you can upload products and sell them on CreatorHub.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleBecomeCreator}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomeHero;
