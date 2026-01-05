import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../services/productApi";
import ProductCard from "../../components/product/ProductCard";
import SkeletonCard from "../../components/common/SkeletonCard";
import { toast } from "react-toastify";

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
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  /* ---------------- FETCH WITH TIMEOUT ---------------- */
  useEffect(() => {
    let didFinish = false;
    const timeoutId = setTimeout(() => {
      if (!didFinish) {
        setLoading(false);
        setError("Request timed out. Please try again.");
      }
    }, 8000);

    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        if (!didFinish) {
          setAllProducts(res.data.products || []);
        }
      } catch {
        if (!didFinish) {
          setError("Failed to load products");
          toast.error("Failed to load products");
        }
      } finally {
        if (!didFinish) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      didFinish = true;
      clearTimeout(timeoutId);
    };
  }, []);

  /* ---------------- DERIVED PRODUCTS ---------------- */
  const products = useMemo(() => {
    let list = allProducts;

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    return list;
  }, [allProducts, selectedCategory, query]);

  const handleCategoryChange = (value) => {
    value ? setSearchParams({ category: value }) : setSearchParams({});
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
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#e6eef2",
            }}
          />

          <Button
            variant="outline-light"
            style={{ borderRadius: 10, minWidth: 110 }}
            onClick={() => {}}
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
                style={{ borderRadius: 20, fontWeight: active ? 700 : 500 }}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </Button>
            );
          })}
        </div>

        {/* CONTENT */}
        {loading ? (
          <Row className="g-3 g-md-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Col key={i} xs={12} sm={6} md={4} lg={3}>
                <SkeletonCard />
              </Col>
            ))}
          </Row>
        ) : error ? (
          <div style={{ color: "#9ca3af", marginTop: 60, textAlign: "center" }}>
            {error}
          </div>
        ) : products.length > 0 ? (
          <Row className="g-3 g-md-4">
            {products.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={item} />
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ color: "#9ca3af", marginTop: 60, textAlign: "center" }}>
            No results found.
          </div>
        )}
      </Container>
    </main>
  );
};

export default Explore;
