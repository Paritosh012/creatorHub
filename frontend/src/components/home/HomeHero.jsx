import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

/**
 * CHANGE:
 * - Removed product upload logic from HomeHero
 * - HomeHero should NOT handle product creation
 * - This avoids duplication with Dashboard
 */

const HomeHero = () => {
  const navigate = useNavigate();

  /**
   * CHANGE:
   * - Removed direct localStorage access
   * - Auth source of truth should be backend (/users/me)
   */
  const [user, setUser] = useState(null);
  const [showCreatorModal, setShowCreatorModal] = useState(false);

  /**
   * CHANGE:
   * - Fetch auth state from backend
   * - Keeps Hero in sync with Navbar
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const isCreator = user?.role === "creator";

  /* ---------------- BECOME CREATOR ---------------- */
  const handleBecomeCreator = async () => {
    try {
      const res = await api.put("/users/become-creator");

      if (res.data.success) {
        toast.success("You are now a creator 🚀");

        /**
         * CHANGE:
         * - No localStorage mutation
         * - Rely on backend + re-fetch via dashboard/navbar
         */
        setShowCreatorModal(false);
        navigate("/dashboard");
      }
    } catch {
      toast.error("Failed to become creator");
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="py-4 py-md-5">
        <Container>
          <Row className="align-items-center gy-4">
            <Col lg={6}>
              <h1 style={{ color: "#fff", fontWeight: 800 }}>
                A Premium Marketplace for Creators
              </h1>

              <p style={{ color: "#9ca3af", marginTop: 14 }}>
                Sell UI kits, templates, icons, and digital assets.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Button as={Link} to="/explore">
                  Explore Assets
                </Button>

                {user ? (
                  isCreator ? (
                    /**
                     * CHANGE:
                     * - Redirect creator to dashboard instead of upload modal
                     */
                    <Button onClick={() => navigate("/dashboard")}>
                      Go to Dashboard
                    </Button>
                  ) : (
                    <Button
                      variant="outline-light"
                      onClick={() => setShowCreatorModal(true)}
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
                src="https://picsum.photos/seed/creatorhub/900/560"
                alt="preview"
                style={{
                  width: "100%",
                  borderRadius: 14,
                  maxHeight: 420,
                  objectFit: "cover",
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* BECOME CREATOR MODAL */}
      <Modal
        show={showCreatorModal}
        onHide={() => setShowCreatorModal(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Become a Creator</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          You’ll be able to upload and sell products on CreatorHub.
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCreatorModal(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleBecomeCreator}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomeHero;
