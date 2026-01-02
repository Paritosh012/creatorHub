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

    const filtered = allProducts.filter(
      (p) => p.category === selectedCategory
    );
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
    <main className="py-4 py-md-5">
      <Container>
        {/* SEARCH */}
        <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
          <Form.Control
            placeholder="Search assets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#e6eef2",
            }}
          />

          <Button
            variant="outline-light"
            style={{ borderRadius: 10, minWidth: 110 }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        {/* CATEGORIES */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {categoryOptions.map((cat) => {
            const active =
              selectedCategory === cat.value ||
              (!selectedCategory && cat.value === null);

            return (
              <Button
                key={cat.label}
                size="sm"
                variant={active ? "light" : "outline-light"}
                style={{
                  borderRadius: 20,
                  fontWeight: active ? 700 : 500,
                }}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </Button>
            );
          })}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : products.length > 0 ? (
          <Row className="g-3 g-md-4">
            {products.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={item} />
              </Col>
            ))}
          </Row>
        ) : (
          <div
            style={{
              color: "#9ca3af",
              marginTop: 60,
              textAlign: "center",
            }}
          >
            No results found.
          </div>
        )}
      </Container>
    </main>
  );
};

export default Explore;
