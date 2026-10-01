import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/App.css";
import Catalogue from "../components/Catalogue";
import Product from "../components/ProductDetails";
import ShortList from "../components/ShortList";
import NotFound from "../components/Notfound";
import Compare from "../components/Compare";

function App() {
  const [shortList, setShortList] = useState<number[]>(() => {
    const storageProducts = localStorage.getItem("shortList");
    if (!storageProducts) {
      return [];
    }
    return JSON.parse(storageProducts);
  });

  useEffect(() => {
    localStorage.setItem("shortList", JSON.stringify(shortList));
  }, [shortList]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route
            path="/products"
            element={
              <Catalogue shortList={shortList} setShortList={setShortList} />
            }
          />
          <Route path="/products/:id" element={<Product />} />
          <Route
            path="/shortlist"
            element={
              <ShortList shortList={shortList} setShortList={setShortList} />
            }
          />
          <Route path="/compare" element={<Compare shortList={shortList} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
