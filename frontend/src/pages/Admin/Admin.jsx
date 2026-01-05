import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productApi";
import api from "../../services/api";
import { Button, Container, Table, Modal, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.products || []);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- CREATE PRODUCT ---------------- */
  const addProduct = async () => {
    // CHANGE: basic validation
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const payload = {
        title: title.trim(),
        price: Number(price || 0), // CHANGE: normalize number
        description: "Admin created product",
        thumbnail: "https://picsum.photos/seed/admin/600/420",
        fileUrl: "#",
        category: "ui-kits",
      };

      // CHANGE: backend should generate slug
      const res = await api.post("/admin/products/create", payload);

      // CHANGE: update UI without reload
      setProducts((prev) => [res.data.product, ...prev]);

      toast.success("Product created");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Create failed");
    }
  };

  const closeModal = () => {
    setShow(false);
    setTitle("");
    setPrice("");
  };

  return (
    <Container style={{ paddingTop: 40 }}>
      <div className="d-flex justify-content-between mb-3">
        <h3>Admin Panel</h3>
        <Button onClick={() => setShow(true)}>Add Product</Button>
      </div>

      {loading ? (
        // CHANGE: loading state
        <div className="d-flex justify-content-center mt-4">
          <Spinner />
        </div>
      ) : products.length === 0 ? (
        // CHANGE: empty state
        <p style={{ color: "#9ca3af" }}>No products found</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.price === 0 ? "Free" : `₹${p.price}`}</td>
                <td>{p.category}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* MODAL */}
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            placeholder="Title"
            className="mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Form.Control
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={addProduct}>Create</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admin;
