// src/features/products/productsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sizes: string[];
  images: string[];
  colors: string[];
  avgRating: number;
  ratingQuantity: number;
  createdAt: string;
  updatedAt: string;
}
interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.status = "succeeded";
    },
    setLoading(state) {
      state.status = "loading";
    },
    setError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions;

export const selectAllProducts = (state: RootState) => state.products?.products;

export default productsSlice.reducer;
