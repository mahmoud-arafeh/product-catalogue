import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductDetails, updateProduct } from "../services/product";
import type { Product } from "../types/types";

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductDetails(id!);
        setProduct(data);
        setEditedTitle(data.title);
        setEditedPrice(String(data.price));
      } catch (error) {
        if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") {
          setError("Product not found.");
        } else {
          setError("Unable to load product. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const cancelHandler = () => {
    if (!product) return;
    setEditedTitle(product.title);
    setEditedPrice(String(product.price));
    setSaveError(null);
    setIsEditing(false);
  };

  const saveHandler = async () => {
    if (!product) return;
    const trimmedTitle = editedTitle.trim();
    const price = Number(editedPrice);
    if (!trimmedTitle) {
      setSaveError("Title cannot be empty.");
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      setSaveError("Price must be a valid positive number.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      await updateProduct(product.id.toString(), trimmedTitle, price);
      setProduct((currentProduct) => {
        if (!currentProduct) return currentProduct;
        return { ...currentProduct, title: trimmedTitle, price };
      });
      setEditedTitle(trimmedTitle);
      setEditedPrice(String(price));
      setIsEditing(false);
    } catch {
      setSaveError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }
  const productData = (
    <main>
      <article>
        <section>
          <div>
            {product.images.map((image) => (
              <img key={image} src={image} alt={product.title} />
            ))}
          </div>
          <div>
            {isEditing ? (
              <>
                <label>
                  Title
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                </label>
                <label>
                  Price
                  <input
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                  />
                </label>
                {saveError && <p role="alert">{saveError}</p>}
                <button type="button" onClick={cancelHandler} disabled={saving}>
                  Cancel
                </button>
                <button type="button" onClick={saveHandler} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <>
                <h1>{product.title}</h1>
                <p>Price: ${product.price}</p>

                <button
                  type="button"
                  onClick={() => {
                    setSaveError(null);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
              </>
            )}
            <p>{product.description}</p>
            <p>Rating: {product.rating}/5</p>
            <p>Stock: {product.stock}</p>
          </div>
        </section>
        <section>
          <h2>Reviews</h2>
          {product.reviews.map((review) => (
            <article key={review.reviewerEmail}>
              <h3>{review.reviewerName}</h3>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}/5</p>
            </article>
          ))}
        </section>
      </article>
    </main>
  );

  return productData;
}
export default ProductDetails;
