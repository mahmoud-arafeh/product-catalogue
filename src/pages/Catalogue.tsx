import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { getCategory, getProducts, searchProducts } from "../services/product";
import type { Product, CatalogueProps } from "../types/types";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchProducts";
import SortProducts from "../components/SortProducts";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import "../styles/productList.css";

function Catalogue({ shortList, setShortList }: CatalogueProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortListMessage] = useState("");

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search");
  const sortBy = searchParams.get("sort");
  const category = searchParams.get("category");

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (searchTerm) {
          data = await searchProducts(
            searchTerm,
            currentPage,
            sortBy,
            controller.signal,
          );
        } else if (category) {
          data = await getCategory(category, currentPage, sortBy);
        } else {
          data = await getProducts(currentPage, sortBy);
        }
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 10));
      } catch (error) {
        if (error instanceof Error && error.name === "CanceledError") {
          return;
        }
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      controller.abort();
    };
  }, [currentPage, searchTerm, sortBy, category]);

  const handleAddShortList = useCallback(
    (id: number) => {
      setShortList((currentShortList) => {
        if (currentShortList.includes(id)) {
          return currentShortList;
        }
        if (currentShortList.length >= 4) {
          return currentShortList;
        }
        return [...currentShortList, id];
      });
    },
    [setShortList],
  );

  const handleRemoveShortList = useCallback(
    (id: number) => {
      setShortList((currentShortList) =>
        currentShortList.filter((productId) => productId !== id),
      );
    },
    [setShortList],
  );

  const productsList = products.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        isShortlisted={shortList.includes(product.id)}
        onAdd={handleAddShortList}
        onRemove={handleRemoveShortList}
      />
    );
  });
  return (
    <div>
      <div className="catalogue-controls">
        <SearchBar />
        <Categories />
        <SortProducts />
      </div>
      {shortListMessage && <p role="alert">{shortListMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : products.length === 0 ? (
        <p className="empty-state">no products found!</p>
      ) : (
        <div className="products-grid">{productsList}</div>
      )}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
export default Catalogue;
