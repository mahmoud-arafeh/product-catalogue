import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../styles/App.css";
import Catalogue from "../components/Catalogue";
import Product from "../components/ProductDetails";
import ShortList from "../components/ShortList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Catalogue />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/shortList" element={<ShortList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
