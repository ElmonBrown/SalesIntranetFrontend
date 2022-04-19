import { createFeatureSelector, createSelector } from '@ngrx/store';
import { initTimestamp } from 'ngx-bootstrap/chronos/units/timestamp';
import { calculateTotalOfPages } from 'src/utils/calculate-total-of-pages';
import { ORDERS_LIMIT } from 'src/utils/const';
import * as MainProductsReducer from './products.reducer';

export const getProductsState = 
    createFeatureSelector<MainProductsReducer.ProductsState>(MainProductsReducer.featureKey);

export const getProducts = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => state.products,
);
export const getSelectedProduct = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => state.selectedProduct,
);
export const getIsLoading = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => state.isLoading
);
export const getIsComponentLoading = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => state.isComponentLoading
);
export const getTotalOfProducts = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => state.totalOfProducts
);
export const getTotalOfPages = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => {
    const totalOfItems = state.totalOfProducts;
    const totalOfPages = calculateTotalOfPages(totalOfItems, ORDERS_LIMIT);
    return totalOfPages;
  },
);
export const getOrderIsQuoted = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => {
    let isQuoted: boolean

    if (state.cart?.items.length === 0) {
      isQuoted = false
    } else {
      isQuoted  = state.cart?.items.every(item => item.amount != 0 && item.price != 0)
    }
    
    return isQuoted;
  }
);
export const getCartIsEmpty = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => state.cart?.items.length === 0
)
export const getCart = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => state.cart,
);
export const getOrders = createSelector(
  getProductsState,
  (state: MainProductsReducer.ProductsState) => state.orders
);
