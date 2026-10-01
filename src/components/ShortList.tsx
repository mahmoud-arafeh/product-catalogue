import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Product, ShortListProps } from "../types/types";
import { getProductDetails } from "../services/product";

function ShortList({ shortList, setShortList }: ShortListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchedProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const ids = shortList;

        const results = await Promise.allSettled(
          ids.map((id) => getProductDetails(String(id))),
        );
        const failedResults = results.filter(
          (result) => result.status === "rejected",
        );
        if (failedResults.length > 0) {
          setError("Some shortlisted products could not be loaded.");
        }
        const fetchedProducts = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);

        setProducts(fetchedProducts);
      } catch {
        setError("Unable to load your shortlist. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchedProducts();
  }, [shortList]);

  const removeHandler = (id: number) => {
    setShortList((currentShortList) =>
      currentShortList.filter((productId) => productId !== id),
    );

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    );
  };

  const productsList = products.map((product) => {
    return (
      <article key={product.id}>
        <img src={product.thumbnail} alt={product.title} />
        <h2>{product.title}</h2>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating}/5</p>
        <button type="button" onClick={() => removeHandler(product.id)}>
          Remove from shortlist
        </button>
      </article>
    );
  });
  if (loading) {
    return <p>Loading shortlist...</p>;
  }

  return (
    <main>
      <h1>Shortlist</h1>
      <Link to="/compare"> Compare products</Link>
      {error && <p role="alert">{error}</p>}
      {products.length === 0 ? <p> Your shortlist is empty.</p> : productsList}
    </main>
  );
}
export default ShortList;
