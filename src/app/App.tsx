import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Catalogue from "../pages/Catalogue";
import ProductDetails from "../pages/ProductDetails";
import ShortList from "../pages/ShortList";
import NotFound from "../pages/Notfound";
import Compare from "../pages/Compare";
import Header from "../components/Header";
import OfflineBanner from "../components/OfflineBanner";

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

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== "shortList") {
        return;
      }

      if (event.newValue === null) {
        setShortList([]);
        return;
      }

      setShortList(JSON.parse(event.newValue));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <OfflineBanner />
        <Header shortList={shortList} />
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route
            path="/products"
            element={
              <Catalogue shortList={shortList} setShortList={setShortList} />
            }
          />
          <Route path="/products/:id" element={<ProductDetails />} />
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
