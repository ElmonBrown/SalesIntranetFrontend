import { createReducer, on } from "@ngrx/store";
import { Cart } from "../models/cart";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { ProductDetail } from "../models/product-detail";
import * as productActions from './products.actions';

export const featureKey = 'products';

export interface ProductsState {
  products: Product[];
  cart: Cart;
  totalOfProducts: number;
  selectedProduct: ProductDetail;
  isLoading: boolean;
  isComponentLoading: boolean;
  orders: Order[],
}

export const initalState: ProductsState = {
  products: Array<Product>(),
  cart: null,
  totalOfProducts: 0,
  selectedProduct: null,
  isLoading: false,
  isComponentLoading: false,
  orders: null,
}

export const productsReducer = createReducer(
  initalState,
  on(productActions.loadProducts, (state) => ({...state, isLoading: true})),
  on(productActions.loadOneProduct, (state) => ({...state, isLoading: true})),
  on(productActions.oneProductLoaded, (state, {payload}) => ({
    ...state, 
    isLoading: false, 
    selectedProduct: payload, 
  })),
  on(productActions.productsLoaded, (state, {payload, totalOfProducts}) => ({
    ...state,
    products: payload,
    totalOfProducts: totalOfProducts,
    isLoading: false
  })),
  on(productActions.addToCart, (state) => ({...state, isLoading: true})),
  on(productActions.updateItemInCart, (state) => ({...state, isComponentLoading: true})),
  on(productActions.deleteFromCart, (state) => ({...state, isLoading: true})),
  on(productActions.getCart, (state) => ({...state, isLoading: true})),
  on(productActions.cartLoaded, (state, {cart}) => ({
    ...state,
    cart,
    isLoading: false ,
    isComponentLoading: false
  })),
  on(productActions.quoteOrder, (state) => ({...state, isLoading: true})),
  on(productActions.transfer, (state) => ({...state, isLoading: true})),
  on(productActions.finishOrder, (state) => ({...state, isLoading: true})),
  on(productActions.orderFinished, (state) => ({...state, isLoading: false})),
  on(productActions.loadOrders, (state) => ({...state, isLoading: true})),
  on(productActions.ordersLoaded, (state, {orders}) => ({...state, isLoading: false, orders})),
  on(productActions.isLoadingToFalse, (state) => ({...state, isLoading: false})),
);