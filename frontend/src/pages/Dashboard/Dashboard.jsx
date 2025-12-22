import { useEffect, useState } from "react";
import api from "../../services/api";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "ui-kits",
    thumbnail: "",
    description: "",
  });

  const handleCreateProduct = async () => {
    try {
      await api.post("/users/dashboard/create", {
        title: form.title,
        slug: form.title.toLowerCase().replace(/\s+/g, "-"),
        price: form.price,
        category: form.category,
        thumbnail: form.thumbnail,
        description: form.description,
        tags: [form.category],
        downloads: 0,
      });

      if (res.data.success) {
        toast.success("Product uploaded 🚀");
        setShowModal(false);

        // refresh product list
        setProducts((prev) => [res.data.product, ...prev]);

        // reset form
        setForm({
          title: "",
          price: "",
          category: "ui-kits",
          thumbnail: "",
          description: "",
        });
      }
    } catch (err) {
      toast.error("Failed to upload product");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api
      .get("/products/creator")
      .then((res) => setProducts(res.data.products))
      .finally(() => setLoading(false));
  }, []);

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

      <p style={{ color: "#9ca3af" }}>Manage your products and activity</p>

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
            <h3>{products.reduce((sum, p) => sum + (p.downloads || 0), 0)}</h3>
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Product</Modal.Title>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateProduct}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
