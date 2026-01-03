import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "ui-kits",
    description: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [productFile, setProductFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/creator");
        setProducts(res.data.products || []);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- CREATE ---------------- */
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
      if (thumbnailFile) fd.append("thumbnail", thumbnailFile);
      if (productFile) fd.append("file", productFile);

      const res = await api.post("/products/dashboard/create", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product uploaded 🚀");
      setProducts((prev) => [res.data.product, ...prev]);
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Upload failed");
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEditOpen = (product) => {
    setEditingId(product._id);
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
    });
    setThumbnailFile(null);
    setProductFile(null);
    setShowModal(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const fd = new FormData();
      const priceValue = Number(form.price || 0);

      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("price", priceValue);
      fd.append("isFree", priceValue === 0);
      fd.append("category", form.category);
      fd.append("tags", form.category);

      if (thumbnailFile) fd.append("thumbnail", thumbnailFile);
      if (productFile) fd.append("file", productFile);

      const res = await api.put(`/products/${editingId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated");
      setProducts((prev) =>
        prev.map((p) => (p._id === editingId ? res.data.product : p))
      );
      closeModal();
    } catch {
      toast.error("Update failed");
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- RESET ---------------- */
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({
      title: "",
      price: "",
      category: "ui-kits",
      description: "",
    });
    setThumbnailFile(null);
    setProductFile(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner />
      </div>
    );
  }

  return (
    <Container style={{ paddingTop: 40 }}>
      <h2 style={{ color: "#fff", fontWeight: 800 }}>
        Welcome, {user?.name || "Creator"}
      </h2>

      <div className="d-flex gap-2 mt-4">
        <Button onClick={() => setShowModal(true)}>Add New Product</Button>
        <Button variant="outline-light" onClick={() => navigate("/explore")}>
          Explore Marketplace
        </Button>
      </div>

      <Row className="g-4 mt-4">
        {products.map((p) => (
          <Col md={4} key={p._id}>
            <Card className="bg-dark border-secondary">
              <Card.Img
                src={p.thumbnail}
                style={{ height: 160, objectFit: "cover" }}
              />
              <Card.Body>
                <h6>{p.title}</h6>
                <p style={{ color: "#9ca3af", fontSize: 13 }}>
                  {p.price === 0 ? "Free" : `₹${p.price}`}
                </p>
                <div className="d-flex gap-2">
                  <Button size="sm" onClick={() => handleEditOpen(p)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDeleteProduct(p._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Product" : "Upload Product"}
          </Modal.Title>
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
              placeholder="Price (0 for free)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <Form.Select
              className="mb-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="ui-kits">UI Kits</option>
              <option value="templates">Templates</option>
              <option value="icons">Icons</option>
              <option value="3d-assets">3D Assets</option>
            </Form.Select>

            <Form.Control
              className="mb-2"
              as="textarea"
              rows={3}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <Form.Control
              className="mb-2"
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
            />

            <Form.Control
              type="file"
              onChange={(e) => setProductFile(e.target.files[0])}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            onClick={editingId ? handleUpdateProduct : handleCreateProduct}
          >
            {editingId ? "Update" : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
