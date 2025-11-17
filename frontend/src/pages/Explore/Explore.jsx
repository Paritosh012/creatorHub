import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ProductCard from "../../components/product/ProductCard";
import { getAllProducts } from "../../services/productApi";

const mockData = [
  {
    id: 1,
    title: "Minimal UI Kit – Starter",
    creator: "Asha Verma",
    price: 399,
    thumbnail: "https://picsum.photos/seed/ui1/600/420",
    tags: ["ui-kit", "figma"],
    downloads: 3200,
    isNew: true,
    category: "ui-kits",
  },
  {
    id: 2,
    title: "Minimal UI Kit – Pro Edition",
    creator: "Asha Verma",
    price: 599,
    thumbnail: "https://picsum.photos/seed/ui2/600/420",
    tags: ["ui-kit", "clean"],
    downloads: 5100,
    isNew: false,
    category: "ui-kits",
  },
  {
    id: 3,
    title: "Modern Dashboard UI – Analytics",
    creator: "Ravi Singh",
    price: 499,
    thumbnail: "https://picsum.photos/seed/ui3/600/420",
    tags: ["dashboard", "ui-kit"],
    downloads: 2900,
    isNew: true,
    category: "ui-kits",
  },
  {
    id: 4,
    title: "Figma Components Library – Essentials",
    creator: "Dev Thakur",
    price: 349,
    thumbnail: "https://picsum.photos/seed/ui4/600/420",
    tags: ["figma", "components"],
    downloads: 1500,
    isNew: false,
    category: "ui-kits",
  },
  {
    id: 5,
    title: "Startup Wireframe Kit",
    creator: "Maya Kapoor",
    price: 199,
    thumbnail: "https://picsum.photos/seed/ui5/600/420",
    tags: ["wireframe", "figma"],
    downloads: 800,
    isNew: false,
    category: "ui-kits",
  },
  {
    id: 6,
    title: "Finance App UI – Mobile",
    creator: "Anika Das",
    price: 299,
    thumbnail: "https://picsum.photos/seed/ui6/600/420",
    tags: ["mobile-ui", "template"],
    downloads: 1600,
    isNew: false,
    category: "ui-kits",
  },
  {
    id: 7,
    title: "Health & Fitness App UI",
    creator: "Yuvraj",
    price: 349,
    thumbnail: "https://picsum.photos/seed/ui7/600/420",
    tags: ["mobile-ui", "ui-kit"],
    downloads: 2100,
    isNew: true,
    category: "ui-kits",
  },
  {
    id: 8,
    title: "Education Platform UI Template",
    creator: "Sanya Rao",
    price: 399,
    thumbnail: "https://picsum.photos/seed/ui8/600/420",
    tags: ["template", "ui-kit"],
    downloads: 900,
    isNew: false,
    category: "ui-kits",
  },
  {
    id: 9,
    title: "SaaS Dashboard – Clean Layout",
    creator: "Karthik",
    price: 449,
    thumbnail: "https://picsum.photos/seed/ui9/600/420",
    tags: ["dashboard", "saas"],
    downloads: 2200,
    isNew: false,
    category: "ui-kits",
  },
  {
    id: 10,
    title: "Crypto Wallet UI Kit",
    creator: "Ayush",
    price: 299,
    thumbnail: "https://picsum.photos/seed/ui10/600/420",
    tags: ["crypto", "mobile-ui"],
    downloads: 1300,
    isNew: true,
    category: "ui-kits",
  },

  /* ---------- Templates (11–20) ---------- */

  {
    id: 11,
    title: "Agency Website Template",
    creator: "Rohan",
    price: 499,
    thumbnail: "https://picsum.photos/seed/t1/600/420",
    tags: ["template", "landing"],
    downloads: 2600,
    isNew: false,
    category: "templates",
  },
  {
    id: 12,
    title: "Portfolio Template – Minimal",
    creator: "Divya",
    price: 0,
    thumbnail: "https://picsum.photos/seed/t2/600/420",
    tags: ["template", "free"],
    downloads: 7000,
    isNew: true,
    category: "templates",
  },
  {
    id: 13,
    title: "Restaurant Landing Page",
    creator: "Karthik",
    price: 249,
    thumbnail: "https://picsum.photos/seed/t3/600/420",
    tags: ["landing", "template"],
    downloads: 1700,
    isNew: false,
    category: "templates",
  },
  {
    id: 14,
    title: "SaaS Website Template",
    creator: "Ayush",
    price: 299,
    thumbnail: "https://picsum.photos/seed/t4/600/420",
    tags: ["saas", "landing"],
    downloads: 2400,
    isNew: true,
    category: "templates",
  },
  {
    id: 15,
    title: "Mobile App Showcase Template",
    creator: "Asha Verma",
    price: 199,
    thumbnail: "https://picsum.photos/seed/t5/600/420",
    tags: ["template", "app"],
    downloads: 1100,
    isNew: false,
    category: "templates",
  },

  /* ---------- 3D Assets (21–30) ---------- */

  {
    id: 21,
    title: "3D Abstract Shapes Pack",
    creator: "Ravi Singh",
    price: 299,
    thumbnail: "https://picsum.photos/seed/3d1/600/420",
    tags: ["3d", "shapes"],
    downloads: 3500,
    isNew: true,
    category: "3d-assets",
  },
  {
    id: 22,
    title: "3D Device Mockups – Realistic",
    creator: "Yuvraj",
    price: 399,
    thumbnail: "https://picsum.photos/seed/3d2/600/420",
    tags: ["mockups", "3d"],
    downloads: 1900,
    isNew: false,
    category: "3d-assets",
  },
  {
    id: 23,
    title: "3D Icons – Pastel Series",
    creator: "Anika",
    price: 0,
    thumbnail: "https://picsum.photos/seed/3d3/600/420",
    tags: ["icons", "3d"],
    downloads: 6100,
    isNew: true,
    category: "3d-assets",
  },

  /* ---------- Icons (31–40) ---------- */

  {
    id: 31,
    title: "Modern Icon Set – 1500+",
    creator: "Divya",
    price: 249,
    thumbnail: "https://picsum.photos/seed/i1/600/420",
    tags: ["icons", "minimal"],
    downloads: 5000,
    isNew: false,
    category: "icons",
  },
  {
    id: 32,
    title: "Rounded Icons – 900+",
    creator: "Karthik",
    price: 199,
    thumbnail: "https://picsum.photos/seed/i2/600/420",
    tags: ["icons", "rounded"],
    downloads: 2600,
    isNew: true,
    category: "icons",
  },
  {
    id: 33,
    title: "Line Icons – 1100+",
    creator: "Asha Verma",
    price: 149,
    thumbnail: "https://picsum.photos/seed/i3/600/420",
    tags: ["icons", "line"],
    downloads: 3300,
    isNew: false,
    category: "icons",
  },

  /* ---------- Illustrations (41–50) ---------- */

  {
    id: 41,
    title: "Premium Illustration Pack – Vol.1",
    creator: "Maya Kapoor",
    price: 399,
    thumbnail: "httpsum.photos/seed/ill1/600/420",
    tags: ["illustrations", "vector"],
    downloads: 2900,
    isNew: true,
    category: "illustrations",
  },
  {
    id: 42,
    title: "Business Illustrations – Startup Set",
    creator: "Rohan",
    price: 299,
    thumbnail: "https://picsum.photos/seed/ill2/600/420",
    tags: ["illustrations", "business"],
    downloads: 2600,
    isNew: false,
    category: "illustrations",
  },
];

const Explore = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  // 1) Fetch ALL products once
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getAllProducts();
        setAllProducts(res.data);
        setProducts(res.data);
      } catch (err) {
        setProducts(mockData);
        setAllProducts(mockData);
        console.log(err);
      }
    };

    fetchAll();
  }, []);

  // 2) Search filter (simple)
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

  return (
    <main style={{ paddingTop: 40, paddingBottom: 40 }}>
      <Container>
        {/* Search Bar */}
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
          />

          <Button
            variant="outline-light"
            style={{ borderRadius: 10 }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        {/* Product Grid */}
        <Row className="g-4">
          {products.length > 0 ? (
            products.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={item} />
              </Col>
            ))
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
