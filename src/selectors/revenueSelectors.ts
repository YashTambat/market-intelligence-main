import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '../features/products/productSlice';

const selectProducts = (state: RootState) => state.products.filteredItems;

export const selectVisibleProducts = createSelector(
  [selectProducts],
  (products) => (Array.isArray(products) ? products : [])
);

export const selectRevenueSeries = createSelector(
  [selectVisibleProducts],
  (products) => products.map((p: Product) => ({
    id: p.id,
    value: p.price * p.stock,
    name: p.title,
  }))
);

export const selectTotalRevenue = createSelector(
  [selectRevenueSeries],
  (revenue) => revenue.reduce((acc, curr) => acc + curr.value, 0)
);

export const selectFilteredRevenue = createSelector(
  [selectVisibleProducts],
  (products) => ({
    total: products.reduce((acc: number, p: Product) => acc + p.price * p.stock, 0),
    currency: 'USD',
  })
);
