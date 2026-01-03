import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProductDetails from "./components/product/ProductsDetails";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/Checkout/Success";
import Admin from "./pages/Admin/Admin";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatorProfile from "./pages/CreatorProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="admin" element={<Admin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="creator/:id" element={<CreatorProfile />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
