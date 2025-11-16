import { useEffect, useState } from "react";
import HomeHero from "../../components/home/HomeHero";
import PopularProducts from "../../components/home/PopularProducts";
import axios from "axios";
import WhyCreatorHub from "../../components/home/WhyCreatorHub";
import CTASection from "../../components/home/CTASection";
import CategoryShowcase from "../../components/home/CategoryShowcase";

const Home = () => {
  const productsList = [
    {
      id: 1,
      title: "Minimal UI Kit",
      creator: "Asha",
      price: 499,
      thumbnail: "https://picsum.photos/seed/p1/500/400",
    },
    {
      id: 2,
      title: "3D Icons Pack",
      creator: "Ravi",
      price: 299,
      thumbnail: "https://picsum.photos/seed/p2/500/400",
    },
    {
      id: 3,
      title: "Dashboard Template",
      creator: "Maya",
      price: 0,
      thumbnail: "httpsum.photos/seed/p3/500/400",
    },
    {
      id: 4,
      title: "Figma Wireframe Kit",
      creator: "Dev",
      price: 199,
      thumbnail: "https://picsum.photos/seed/p4/500/400",
    },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const api = `http://localhost:8000/api/products`;
      try {
        setLoading(true);
        let res = await axios.get(api);
        setProducts(res.data);
      } catch {
        setProducts(productsList);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <HomeHero />
      <PopularProducts products={products} loading={loading} />
      <CategoryShowcase />
      <WhyCreatorHub />
      <CTASection />
    </>
  );
};
export default Home;
