import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="explore" element={<Explore />} />

            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
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
