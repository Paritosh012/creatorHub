import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const CreatorProfile = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get(`/users/creator/${id}`);
      setCreator(res.data.creator);
      setProducts(res.data.products);
    };

    fetchProfile();
  }, [id]);

  if (!creator) return null;

  return (
    <Container style={{ paddingTop: 40 }}>
      <h2 style={{ color: "#fff", fontWeight: 800 }}>{creator.name}</h2>
      <p style={{ color: "#9ca3af" }}>
        {products.length} products
      </p>

      <Row className="g-4 mt-3">
        {products.map((p) => (
          <Col md={4} key={p._id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CreatorProfile;
