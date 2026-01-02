import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import SiteNavbar from "./components/layout/SiteNavbar";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        theme="dark"
      />
      <SiteNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
