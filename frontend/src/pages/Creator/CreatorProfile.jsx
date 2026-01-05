import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import api from "../../services/api";
import ProductCard from "../../components/product/ProductCard";

const CreatorProfile = () => {
  const { id } = useParams();

  const [creator, setCreator] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/users/creator/${id}`);

        // CHANGE: defensive checks
        if (!res.data?.creator) {
          throw new Error("Creator not found");
        }

        setCreator(res.data.creator);
        setProducts(res.data.products || []);
      } catch {
        setError("Failed to load creator profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // CHANGE: real loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  // CHANGE: error state
  if (error) {
    return (
      <p style={{ color: "#9ca3af", textAlign: "center", marginTop: 40 }}>
        {error}
      </p>
    );
  }

  return (
    <Container style={{ paddingTop: 40 }}>
      <h2 style={{ color: "#fff", fontWeight: 800 }}>
        {creator.name}
      </h2>

      <p style={{ color: "#9ca3af" }}>
        {products.length} products
      </p>

      {products.length === 0 ? (
        // CHANGE: empty state
        <p style={{ color: "#9ca3af", marginTop: 20 }}>
          This creator hasn’t published any products yet.
        </p>
      ) : (
        <Row className="g-4 mt-3">
          {products.map((p) => (
            <Col md={4} key={p._id}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CreatorProfile;
