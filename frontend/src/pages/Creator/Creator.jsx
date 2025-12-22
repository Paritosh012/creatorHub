import { useEffect, useState } from "react";
import api from "../../services/api";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Creator = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/products/creator") // token auto-attached
      .then((res) => {
        setProducts(res.data.products);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container style={{ paddingTop: 40 }}>
      <div className="d-flex justify-content-between mb-3">
        <h3>Creator Dashboard</h3>
        <Button onClick={() => navigate("/admin")}>
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>
          You haven’t created any products yet.
        </p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.price === 0 ? "Free" : `₹${p.price}`}</td>
                <td>{p.status}</td>
                <td>{p.views || 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Creator;
