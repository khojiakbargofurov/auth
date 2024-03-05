import { Route, Routes } from "react-router-dom";
import Products from "../pages/products"; 
import Signup from "../signup/Signup";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
};

export default Routers