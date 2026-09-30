import type { ProductsResponse, Category, Product } from "../types/types";
import axios from "axios";

export const getProducts = async (
  page: number,
  sort: string | null,
): Promise<ProductsResponse> => {
  const [sortBy, order] = sort?.split("-") ?? ["id", "asc"];
  const skip = (page - 1) * 10;
  const products = await axios.get<ProductsResponse>(
    `https://dummyjson.com/products?limit=10&skip=${skip}&sortBy=${sortBy}&order=${order}`,
  );
  return products.data;
};

export const searchProducts = async (
  searchTerm: string,
  page: number,
  sort: string | null,
): Promise<ProductsResponse> => {
  const [sortBy, order] = sort?.split("-") ?? ["id", "asc"];
  const skip = (page - 1) * 10;
  const products = await axios.get<ProductsResponse>(
    `https://dummyjson.com/products/search?q=${searchTerm}&limit=10&skip=${skip}&sortBy=${sortBy}&order=${order}`,
  );
  return products.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const categories = await axios.get<Category[]>(
    `https://dummyjson.com/products/categories`,
  );
  return categories.data;
};

export const getCategory = async (
  slug: string,
  page: number,
  sort: string | null,
): Promise<ProductsResponse> => {
  const [sortBy, order] = sort?.split("-") ?? ["id", "asc"];
  const skip = (page - 1) * 10;
  const category = await axios.get<ProductsResponse>(
    `https://dummyjson.com/products/category/${slug}?limit=10&skip=${skip}&sortBy=${sortBy}&order=${order}`,
  );
  return category.data;
};

export const getProductDetails = async (id: string): Promise<Product> => {
  try {
    const product = await axios.get<Product>(
      `https://dummyjson.com/products/${id}`,
    );
    return product.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("PRODUCT_NOT_FOUND", { cause: error });
    }

    throw error;
  }
};

export const updateProduct = async (
  id: string,
  title: string,
  price: number,
): Promise<Product> => {
  const product = await axios.put(`https://dummyjson.com/products/${id}`, {
    title,
    price,
  });
  return product.data;
};
