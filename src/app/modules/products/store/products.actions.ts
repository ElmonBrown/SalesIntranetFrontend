import { createAction, props } from "@ngrx/store";
import { Cart } from "../models/cart";
import { ItemToCart } from "../models/item-to-cart";
import { ItemToUpdateIncart } from "../models/item-to-update-in-cart";
import { Order } from "../models/order";
import { Product } from "../models/product";

export const isLoadingToFalse = createAction(
  '[Product Store] Is Loading to False'
);

export const loadProducts = createAction(
  '[Products Page] Load Products',
  props<{categoryId: string, page: number, query: String}>(),
);

export const productsLoaded = createAction(
  '[Products Page] Products Loaded Successfully',
  props<{payload: Product[], totalOfProducts: number}>(),
);

export const loadOneProduct = createAction(
  '[Product Detail Page] Load One Product',
  props<{id: String}>(),
);

export const oneProductLoaded = createAction(
  '[Product Detail Page] One Product Loaded',
  props<{payload: Product}>(),
);

export const addToCart = createAction(
  '[Product Detail Page] Add To Cart',
  props<{payload: ItemToCart}>(),
);

export const updateItemInCart = createAction(
  '[Products Cart Page] Update Product to Sell Quantity',
  props<{payload: ItemToUpdateIncart}>(),
);

export const deleteFromCart = createAction(
  '[Product Detail Page] Delete From Cart',
  props<{id: string}>(),
);

export const getCart = createAction(
  '[Products Cart Page] Get Cart',
);

export const cartLoaded = createAction(
  '[Products Cart Page] Cart Loaded',
  props<{cart: Cart}>()
);

export const quoteOrder = createAction(
  '[Product Cart Page] Quote Order'
);

export const transfer = createAction(
  '[Product Cart Page] Transfer',
  props<{fd: FormData}>()
);

export const loadOrders = createAction(
  '[Orders History] Load Orders',
  props<{page: number, query: string}>()
);

export const ordersLoaded = createAction(
  '[Orders History] Orders Loaded',
  props<{orders: Order[]}>()
);

export const finishOrder = createAction(
  '[Products Cart Page] Finish Order'
);

export const orderFinished = createAction(
  '[Product Cart Page] Order Finished'
);


