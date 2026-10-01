import { useEffect, useState } from "react";

import type { Product, CompareProps } from "../types/types";
import { getProductDetails } from "../services/product";
import "../styles/productList.css";

function Compare({ shortList }: CompareProps) {
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
          setError("Some products could not be loaded.");
        }
        const fetchedProducts = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);
        setProducts(fetchedProducts);
      } catch {
        setError("Unable to load comparison. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchedProducts();
  }, [shortList]);

  const cheapestProduct = products.reduce<Product | null>(
    (cheapest, product) => {
      if (!cheapest || product.price < cheapest.price) {
        return product;
      }
      return cheapest;
    },
    null,
  );

  const bestRatedProduct = products.reduce<Product | null>(
    (bestRated, product) => {
      if (!bestRated || product.rating > bestRated.rating) {
        return product;
      }
      return bestRated;
    },
    null,
  );

  const productList = products.map((product) => {
    return (
      <article key={product.id}>
        <img src={product.thumbnail} alt={product.title} />
        <h2>{product.title}</h2>
        {cheapestProduct?.id === product.id && <strong>Cheapest</strong>}
        {bestRatedProduct?.id === product.id && <strong>Best rated</strong>}
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating}/5</p>
      </article>
    );
  });

  return (
    <main>
      <h1>Compare</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        error ? (
          <p role="alert">{error}</p>
        ) : (
          <p>Your shortlist is empty.</p>
        )
      ) : (
        <>
          {error && <p role="alert">{error}</p>}
          <div className="compare-grid">{productList}</div>
        </>
      )}
    </main>
  );
}
export default Compare;
