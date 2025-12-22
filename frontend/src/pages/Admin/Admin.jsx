import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productApi";
import api from "../../services/api";
import { Button, Container, Table, Modal, Form } from "react-bootstrap";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const addProduct = async () => {
    await api.post("/admin/products/create", {
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      description: "Admin created product",
      price,
      thumbnail: "https://picsum.photos/seed/admin/600/420",
      fileUrl: "#",
      category: "ui-kits",
    });

    setShow(false);
    window.location.reload();
  };

  return (
    <Container style={{ paddingTop: 40 }}>
      <div className="d-flex justify-content-between mb-3">
        <h3>Admin Panel</h3>
        <Button onClick={() => setShow(true)}>Add Product</Button>
      </div>

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
              <td>{p.price}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            placeholder="Title"
            className="mb-2"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Control
            placeholder="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={addProduct}>Create</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admin;
