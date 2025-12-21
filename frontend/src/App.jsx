import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProductDetails from "./components/product/ProductsDetails";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/Checkout/Success";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
