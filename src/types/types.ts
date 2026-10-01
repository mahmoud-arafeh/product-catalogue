export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  stock: number;
  images: string[];
  reviews: Review[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface PaginationProps {
  totalPages: number;
}

export interface Category {
  slug: string;
  name: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface CatalogueProps {
  shortList: number[];
  setShortList: React.Dispatch<React.SetStateAction<number[]>>;
}
export interface ShortListProps {
  shortList: number[];
  setShortList: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface CompareProps {
  shortList: number[];
}

export interface HeaderProps {
  shortList: number[];
}

export interface ProductCardProps {
  product: Product;
  isShortlisted: boolean;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}
