import { Link } from "react-router-dom";
import { memo } from "react";

import type { ProductCardProps } from "../types/types";

const ProductCard = memo(function ProductCard({
  product,
  isShortlisted,
  onAdd,
  onRemove,
}: ProductCardProps) {
  return (
    <article className="product-grid">
      <Link to={`/products/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
        <h2> {product.title}</h2>
      </Link>
      <p>{product.description}</p>
      <span>${product.price}</span>
      <span>{product.rating}/5</span>
      {!isShortlisted ? (
        <button onClick={() => onAdd(product.id)}>Add to shortlist</button>
      ) : (
        <button onClick={() => onRemove(product.id)}>
          Remove from shortlist
        </button>
      )}
    </article>
  );
});

export default ProductCard;
