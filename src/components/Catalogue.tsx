import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { getCategory, getProducts, searchProducts } from "../services/product";
import type { Product, CatalogueProps } from "../types/types";
import Pagination from "./Pagination";
import SearchBar from "./SearchProducts";
import SortProducts from "./SortProducts";
import Categories from "./Categories";
import "../styles/productList.css";

function Catalogue({ shortList, setShortList }: CatalogueProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortListMessage, setShortListMessage] = useState("");

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search");
  const sortBy = searchParams.get("sort");
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (searchTerm) {
          data = await searchProducts(searchTerm, currentPage, sortBy);
        } else if (category) {
          data = await getCategory(category, currentPage, sortBy);
        } else {
          data = await getProducts(currentPage, sortBy);
        }
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 10));
      } catch {
        setError("Unable to load products. PLease try again");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, searchTerm, sortBy, category]);

  const handleAddShortList = (id: number) => {
    if (shortList.includes(id)) {
      setShortListMessage("This product is already shortlisted.");
      return;
    }
    if (shortList.length >= 4) {
      setShortListMessage("You can only shortlist 4 products.");
      return;
    }
    setShortList((currentShortList) => [...currentShortList, id]);
    setShortListMessage("");
  };

  const handleRemoveShortList = (id: number) => {
    setShortList((currentShortList) =>
      currentShortList.filter((productId) => productId !== id),
    );
  };

  const productsList = products.map((product) => {
    return (
      <article key={product.id} className="product-grid">
        <Link to={`/products/${product.id}`}>
          <img src={product.thumbnail} alt={product.title} />
          <h2> {product.title}</h2>
        </Link>
        <p>{product.description}</p>
        <span>${product.price}</span>
        <span>{product.rating}/5</span>
        {!shortList.includes(product.id) ? (
          <button onClick={() => handleAddShortList(product.id)}>
            Add to shortlist
          </button>
        ) : (
          <button onClick={() => handleRemoveShortList(product.id)}>
            Remove from shortlist
          </button>
        )}
      </article>
    );
  });
  return (
    <div>
      <SearchBar />
      <Link to={`/shortlist`}>shortList: {shortList.length}</Link>
      <Categories />
      <SortProducts />
      {shortListMessage && <p role="alert">{shortListMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : products.length === 0 ? (
        <p>no products found!</p>
      ) : (
        productsList
      )}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
export default Catalogue;
