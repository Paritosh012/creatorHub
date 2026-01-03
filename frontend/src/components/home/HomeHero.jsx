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
    description: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [productFile, setProductFile] = useState(null);

  const isCreator = user?.role === "creator";

  /* ---------------- CREATE PRODUCT ---------------- */
  const handleCreateProduct = async () => {
    if (
      !form.title ||
      !form.description.trim() ||
      !thumbnailFile ||
      !productFile
    ) {
      toast.error("All fields and files are required");
      return;
    }

    try {
      const fd = new FormData();
      const priceValue = Number(form.price || 0);

      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("price", priceValue);
      fd.append("isFree", priceValue === 0);
      fd.append("category", form.category);
      fd.append("tags", form.category);
      fd.append("thumbnail", thumbnailFile);
      fd.append("file", productFile);

      await api.post("/users/dashboard/create", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product uploaded 🚀");
      setShowProductModal(false);
      resetForm();
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Upload failed");
    }
  };

  /* ---------------- BECOME CREATOR ---------------- */
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

  const resetForm = () => {
    setForm({
      title: "",
      price: "",
      category: "ui-kits",
      description: "",
    });
    setThumbnailFile(null);
    setProductFile(null);
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
          <Button variant="secondary" onClick={() => setShowCreatorModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleBecomeCreator}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      {/* PRODUCT UPLOAD MODAL */}
      <Modal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        centered
        size="lg"
      >
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
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
            />

            <Form.Control
              className="mb-2"
              type="file"
              onChange={(e) => setProductFile(e.target.files[0])}
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
          <Button
            variant="secondary"
            onClick={() => setShowProductModal(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateProduct}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomeHero;
