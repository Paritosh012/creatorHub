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
    thumbnail: "",
    fileUrl: "",
    description: "",
  });

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
      !form.thumbnail ||
      !form.fileUrl ||
      !form.description.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const priceValue = Number(form.price || 0);

      const res = await api.post("/users/dashboard/create", {
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
      thumbnail: product.thumbnail,
      fileUrl: product.fileUrl,
      description: product.description,
    });
    setShowModal(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const priceValue = Number(form.price || 0);

      const res = await api.put(`/products/${editingId}`, {
        title: form.title,
        description: form.description,
        price: priceValue,
        isFree: priceValue === 0,
        category: form.category,
        thumbnail: form.thumbnail,
        fileUrl: form.fileUrl,
        tags: [form.category],
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

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- MODAL RESET ---------------- */
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({
      title: "",
      price: "",
      category: "ui-kits",
      thumbnail: "",
      fileUrl: "",
      description: "",
    });
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner />
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <Container style={{ paddingTop: 40 }}>
      <h2 style={{ color: "#fff", fontWeight: 800 }}>
        Welcome, {user?.name || "Creator"}
      </h2>
      <p style={{ color: "#9ca3af" }}>Manage your products</p>

      {/* STATS */}
      <Row className="g-4 mt-3">
        <Col md={4}>
          <Card className="p-3 bg-dark border-secondary">
            <h6>Total Products</h6>
            <h3>{products.length}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 bg-dark border-secondary">
            <h6>Total Downloads</h6>
            <h3>{products.reduce((s, p) => s + (p.downloads || 0), 0)}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 bg-dark border-secondary">
            <h6>Status</h6>
            <h3>Creator</h3>
          </Card>
        </Col>
      </Row>

      {/* ACTIONS */}
      <div className="d-flex gap-2 mt-4">
        <Button onClick={() => setShowModal(true)}>Add New Product</Button>
        <Button variant="outline-light" onClick={() => navigate("/explore")}>
          Explore Marketplace
        </Button>
      </div>

      {/* PRODUCTS */}
      <h4 className="mt-5">Your Products</h4>

      {products.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>
          You haven’t created any products yet.
        </p>
      ) : (
        <Row className="g-4 mt-2">
          {products.map((p) => (
            <Col md={4} key={p._id}>
              <Card className="bg-dark border-secondary">
                <Card.Img
                  variant="top"
                  src={p.thumbnail}
                  style={{ height: 160, objectFit: "cover" }}
                />
                <Card.Body>
                  <h6>{p.title}</h6>
                  <p style={{ color: "#9ca3af", fontSize: 13 }}>
                    {p.price === 0 ? "Free" : `₹${p.price}`}
                  </p>

                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-light"
                      onClick={() => handleEditOpen(p)}
                    >
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
      )}

      {/* MODAL */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Product" : "Upload New Product"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-2"
              placeholder="Product title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Form.Control
              className="mb-2"
              placeholder="Price (0 for free)"
              type="number"
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
              placeholder="Thumbnail URL"
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
            />

            <Form.Control
              className="mb-2"
              placeholder="Download file URL"
              value={form.fileUrl}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
            />

            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Product description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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