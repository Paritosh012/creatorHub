import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import SiteNavbar from "./components/layout/SiteNavbar";

const Layout = () => {
  return (
    <>
      <SiteNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
