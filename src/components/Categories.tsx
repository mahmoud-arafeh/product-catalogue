import { useEffect, useState } from "react";

import { getCategories } from "../services/product";
import type { Category } from "../types/types";
import { useSearchParams } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectHandler = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", slug);
    newParams.delete("search");
    newParams.set("page", "1");
    setSearchParams(newParams);
    setShow(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setError("Unable to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const categoriesList = categories.map((cat) => {
    return (
      <div key={cat.slug}>
        <button onClick={() => selectHandler(cat.slug)}>{cat.name}</button>
      </div>
    );
  });

  return show ? (
    <div>
      <button onClick={() => setShow(!show)}>Categories</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        categoriesList
      )}
    </div>
  ) : (
    <button onClick={() => setShow(!show)}>Categories</button>
  );
}

export default Categories;
