import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import ProductCard from "../../components/product/ProductCard";
import { getAllProducts } from "../../services/productApi";
import { useSearchParams } from "react-router-dom";

 
const categoryOptions = [
  { label: "All", value: null },
  { label: "UI Kits", value: "ui-kits" },
  { label: "Templates", value: "templates" },
  { label: "3D Assets", value: "3d-assets" },
  { label: "Icons", value: "icons" },
  { label: "Illustrations", value: "illustrations" },
];

const Explore = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await getAllProducts();
        setAllProducts(res.data.products);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Explore fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((p) => p.category === selectedCategory);

    setProducts(filtered);
  }, [selectedCategory, allProducts]);

  const handleSearch = () => {
    if (!query.trim()) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    setProducts(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleCategoryChange = (value) => {
    if (!value) {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <main style={{ paddingTop: 40, paddingBottom: 40 }}>
      <Container>
        <div className="d-flex gap-2 mb-4" style={{ alignItems: "center" }}>
          <Form.Control
            placeholder="Search assets..."
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#e6eef2",
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <Button
            variant="outline-light"
            style={{ borderRadius: 10 }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        <div className="d-flex gap-2 mb-4 flex-wrap">
          {categoryOptions.map((cat) => (
            <Button
              key={cat.label}
              size="sm"
              variant={
                selectedCategory === cat.value ||
                (!selectedCategory && cat.value === null)
                  ? "light"
                  : "outline-light"
              }
              style={{ borderRadius: 20 }}
              onClick={() => handleCategoryChange(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <Row className="g-4">
          {products.length > 0 ? (
            products.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={item} />
              </Col>
            ))
          ) : loading ? (
            <Spinner animation="grow" variant="light" />
          ) : (
            <div
              style={{
                color: "#9ca3af",
                marginTop: 40,
                textAlign: "center",
                width: "100%",
              }}
            >
              No results found.
            </div>
          )}
        </Row>
      </Container>
    </main>
  );
};

export default Explore;
