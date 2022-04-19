import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { ProductsEndpointsService } from '../services/products-endpoints.service';
import * as productActions from './products.actions';

const totalHeaderKey = 'X-Total-Count';

@Injectable()
export class ProductsEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProducts),
      mergeMap(action => 
          this.productEndpoints.getAll(action.categoryId, action.page, action.query).pipe(
            map((response: HttpResponse<Product[]>) => 
              productActions.productsLoaded({
                payload: response.body,
                totalOfProducts: parseInt(response.headers.get(totalHeaderKey)), 
              })
            ),
            catchError(() => {
              this.toast.error('Hubo un error cargando los productos', 'Error', );
              this.store.dispatch(productActions.isLoadingToFalse());
              return EMPTY;
            })
          ) 
      ),
    )
  );

  loadOneProduct$ = createEffect(() => 
    this.actions$.pipe(
      ofType(productActions.loadOneProduct),
      exhaustMap(action => 
        this.productEndpoints.getOne(action.id).pipe(
          map((response: HttpResponse<Product>) => 
            productActions.oneProductLoaded({payload: response.body})
          ),
          catchError(() => {
            this.toast.error('Hubo un error cargando el producto', 'Error',);
            this.store.dispatch(productActions.isLoadingToFalse());
            return EMPTY;
          })
        )
      )
    )
  );

  addToCart$ = createEffect(() => 
    this.actions$.pipe(
      ofType(productActions.addToCart),
      exhaustMap(action => 
        this.productEndpoints.addItemToCart(action.payload).pipe(
          map((_: HttpResponse<any>) => {
            this.toast.success('Producto agregado al carrito', 'Éxito',);
            return productActions.getCart()
          }),
          catchError(() => {
            this.toast.error('Hubo un error agregando artículo al carrito', 'Error',);
            this.store.dispatch(productActions.isLoadingToFalse());
            return EMPTY;
          })
        )  
      )
    )
  );

  updateItemInCart$ = createEffect(() => 
    this.actions$.pipe(
      ofType(productActions.updateItemInCart),
      exhaustMap(action => 
        this.productEndpoints.updateItemInCart(action.payload).pipe(
          map((_: HttpResponse<any>) => {
            this.toast.success('Producto actualizado en el carrito', 'Éxito',); //REMOVE
            return productActions.getCart()
          }),
          catchError(() => {
            this.toast.error('Hubo un error actualizando artículo en el carrito', 'Error',);
            this.store.dispatch(productActions.isLoadingToFalse());
            return EMPTY;
          })
        )  
      )
    )
  );

  deleteItemFromCart$ = createEffect(() => 
    this.actions$.pipe(
      ofType(productActions.deleteFromCart),
      exhaustMap(action => 
        this.productEndpoints.deleteOneFromCart(action.id).pipe(
          map((_: HttpResponse<any>) => {
            return productActions.getCart()
          }),
          catchError(() => {
            this.toast.error('Hubo un error borrando artículo del carrito', 'Error',);
            this.store.dispatch(productActions.isLoadingToFalse());
            return EMPTY;
          })
        )
      )
    )
  );

  getCart$ = createEffect(() => 
    this.actions$.pipe(
      ofType(productActions.getCart),
      mergeMap(() => 
        this.productEndpoints.getCart().pipe(
          map((response: HttpResponse<Cart>) => {
            const cart = response.body;
            return productActions.cartLoaded({cart})
          }),
          catchError(() => {
            this.toast.error('Hubo un error cargando el carrito', 'Error',);
            this.store.dispatch(productActions.isLoadingToFalse());
            return EMPTY;
          })
        )
      )
    )
  );

  quoteOrder$ = createEffect(() => 
    this.actions$.pipe(
      ofType(productActions.quoteOrder),
      exhaustMap(() => 
        this.productEndpoints.quoteOrder().pipe(
          map((_: HttpResponse<any>) => productActions.getCart()),
          catchError(() => {
            this.toast.error('Hubo un error cotizando la orden', 'Error',);
            this.store.dispatch(productActions.isLoadingToFalse());
            return EMPTY;
          })
        )
      )
    )
  );

  transfer$ = createEffect(() => 
    this.actions$.pipe(
      ofType(productActions.transfer),
      exhaustMap(action => 
        this.productEndpoints.transfer(action.fd).pipe(
          map((_: HttpResponse<any>) => {
            this.toast.success('Información enviada', 'Éxito',); 
            return productActions.finishOrder();
          }),
          catchError(() => {
            this.toast.error('Hubo un error enviando información de transferencia', 'Error',);
            this.store.dispatch(productActions.isLoadingToFalse());
            return EMPTY;
          })
        )
      )
    )
  );

  finishOrder$ = createEffect(() => 
    this.actions$.pipe(
      ofType(productActions.finishOrder),
      exhaustMap(() => 
        this.productEndpoints.finishOrder().pipe(
          map((_: HttpResponse<any>) => {
            this.toast.success('Order realizada', 'Éxito');
            return productActions.getCart();
          }),
          catchError(() => {
            this.toast.error('Hubo un error procesando orden', 'Error',);
            this.store.dispatch(productActions.isLoadingToFalse());
            return EMPTY;
          })
        )
      )
    )
  );

  loadOrders$ = createEffect(() => 
    this.actions$.pipe(
      ofType(productActions.loadOrders),
      mergeMap(action => 
        this.productEndpoints.getOrders(action.page, action.query).pipe(
          map((response: HttpResponse<Order[]>) => {
            const orders = response.body;
            return productActions.ordersLoaded({orders})
          }),
          catchError(() => {
            this.toast.error('Hubo un error cargando las órdenes', 'Error',);
            this.store.dispatch(productActions.isLoadingToFalse());
            return EMPTY;
          })
        )  
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productEndpoints: ProductsEndpointsService,
    private toast: ToastrService,
    private store: Store,
  ) {}

}
