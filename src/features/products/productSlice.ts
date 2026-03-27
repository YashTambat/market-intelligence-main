import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { dummyJsonApi } from '../../services/api';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  thumbnail: string;
}

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  skip: number;
  limit: number;
  currentPage: number;
  currentRequestId: string | null;
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 10,
  currentPage: 1,
  currentRequestId: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit, skip, q, category }: { limit: number; skip: number; q?: string; category?: string }) => {
    const trimmedQuery = q?.trim().toLowerCase() ?? '';

    if (category && trimmedQuery) {
      const response = await dummyJsonApi.get(`/products/category/${category}?limit=100&skip=0`);
      const products = Array.isArray(response.data?.products) ? response.data.products : [];
      const matchingProducts = products.filter((product: Product) =>
        product.title.toLowerCase().includes(trimmedQuery)
      );

      return {
        ...response.data,
        products: matchingProducts.slice(skip, skip + limit),
        total: matchingProducts.length,
      };
    }

    let url = `/products?limit=${limit}&skip=${skip}`;

    if (trimmedQuery) {
      url = `/products/search?q=${encodeURIComponent(trimmedQuery)}&limit=${limit}&skip=${skip}`;
    } else if (category) {
      url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    const response = await dummyJsonApi.get(url);
    return response.data;
  }
);

const sortProductList = (
  items: Product[],
  key: keyof Product,
  order: 'asc' | 'desc'
) => {
  const direction = order === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * direction;
    }

    return String(valA).localeCompare(String(valB)) * direction;
  });
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      state.skip = (action.payload - 1) * state.limit;
    },
    sortProducts(state, action: PayloadAction<{ key: keyof Product; order: 'asc' | 'desc' }>) {
      if (!Array.isArray(state.filteredItems)) {
        return;
      }
      const { key, order } = action.payload;
      state.filteredItems = sortProductList(state.filteredItems, key, order);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }
        state.loading = false;
        state.items = Array.isArray(action.payload?.products) ? action.payload.products : [];
        state.filteredItems = Array.isArray(action.payload?.products) ? [...action.payload.products] : [];
        state.total = action.payload?.total || 0;
        state.error = null;
        state.currentRequestId = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
        state.currentRequestId = null;
      });
  },
});

export const { setCurrentPage, sortProducts } = productSlice.actions;
export default productSlice.reducer;
