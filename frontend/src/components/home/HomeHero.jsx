import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const HomeHero = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "ui-kits",
    thumbnail: "",
    fileUrl: "",
    description: "",
  });

  const isCreator = user?.role === "creator";

  const handleCreateProduct = async () => {
    if (
      !form.title ||
      !form.thumbnail ||
      !form.fileUrl ||
      !form.description.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const priceValue = Number(form.price || 0);

      await api.post("/users/dashboard/create", {
        title: form.title,
        description: form.description,
        price: priceValue,
        isFree: priceValue === 0,
        category: form.category,
        thumbnail: form.thumbnail,
        fileUrl: form.fileUrl,
        tags: [form.category],
      });

      toast.success("Product uploaded 🚀");

      setShowProductModal(false);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Upload failed");
    }
  };

  const handleBecomeCreator = async () => {
    try {
      const res = await api.put("/users/become-creator");

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("You are now a creator 🚀");
        setShowCreatorModal(false);
        navigate("/dashboard");
      }
    } catch {
      toast.error("Failed to become creator");
    }
  };

  return (
    <>
      <section style={{ padding: 64 }}>
        <Container>
          <Row className="align-items-center">
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
                    <Button onClick={() => setShowProductModal(true)}>
                      Upload your product
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
                style={{ width: "100%", borderRadius: 12 }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* BECOME CREATOR MODAL */}
      <Modal show={showCreatorModal} onHide={() => setShowCreatorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Become a Creator</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          You’ll be able to upload and sell products on CreatorHub.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreatorModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleBecomeCreator}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      {/* PRODUCT UPLOAD MODAL */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-2"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Form.Control
              className="mb-2"
              type="number"
              placeholder="Price (0 = free)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <Form.Control
              className="mb-2"
              placeholder="Thumbnail URL"
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
            />

            <Form.Control
              className="mb-2"
              placeholder="File URL"
              value={form.fileUrl}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
            />

            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProductModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateProduct}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomeHero;
