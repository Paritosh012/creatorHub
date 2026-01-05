import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SkeletonCard from "../../components/common/SkeletonCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "ui-kits",
    description: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [productFile, setProductFile] = useState(null);

  /* ---------------- AUTH + LOAD PRODUCTS ---------------- */
  useEffect(() => {
    const init = async () => {
      try {
        const meRes = await api.get("/users/me");
        setUser(meRes.data.user);

        const prodRes = await api.get("/products/creator/me");
        setProducts(prodRes.data.products);

        setPageLoading(false);
      } catch (err) {
        navigate("/login");
      }
    };

    init();
  }, [navigate]);

  /* ---------------- CREATE ---------------- */
  const handleCreateProduct = async () => {
    if (actionLoading) return;

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
      setActionLoading(true);

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

      const res = await api.post("/products", fd);

      setProducts((prev) => [res.data.product, ...prev]);
      toast.success("Product uploaded");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Upload failed");
    } finally {
      setActionLoading(false);
    }
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdateProduct = async () => {
    if (actionLoading) return;

    try {
      setActionLoading(true);

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

      const res = await api.put(`/products/${editingId}`, fd);

      setProducts((prev) =>
        prev.map((p) => (p._id === editingId ? res.data.product : p))
      );

      toast.success("Product updated");
      closeModal();
    } catch {
      toast.error("Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (actionLoading) return;
    if (!window.confirm("Delete this product permanently?")) return;

    try {
      setActionLoading(true);
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

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
    setActionLoading(false);
  };

  if (pageLoading) {
    return (
      <Container style={{ paddingTop: 40 }}>
        <Row className="g-4 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Col md={4} key={i}>
              <SkeletonCard />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  return (
    <Container style={{ paddingTop: 40 }}>
      <h2 style={{ color: "#fff", fontWeight: 800 }}>Welcome, {user?.name}</h2>

      <div className="d-flex gap-2 mt-4">
        <Button onClick={() => setShowModal(true)}>Add Product</Button>
        <Button variant="outline-light" onClick={() => navigate("/explore")}>
          Explore
        </Button>
      </div>

      {products.length === 0 ? (
        <p style={{ color: "#9ca3af", marginTop: 24 }}>
          You haven’t uploaded any products yet.
        </p>
      ) : (
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
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingId(p._id);
                        setForm({
                          title: p.title,
                          price: p.price,
                          category: p.category,
                          description: p.description,
                        });
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(p._id)}
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

      {/* Modal unchanged */}
    </Container>
  );
};

export default Dashboard;
