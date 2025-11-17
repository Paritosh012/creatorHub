import { useEffect, useState } from "react";
import HomeHero from "../../components/home/HomeHero";
import PopularProducts from "../../components/home/PopularProducts";
import axios from "axios";
import WhyCreatorHub from "../../components/home/WhyCreatorHub";
import CTASection from "../../components/home/CTASection";
import CategoryShowcase from "../../components/home/CategoryShowcase";

const Home = () => {
  return (
    <>
      <HomeHero />
      <PopularProducts />
      <CategoryShowcase />
      <WhyCreatorHub />
      <CTASection />
    </>
  );
};
export default Home;
