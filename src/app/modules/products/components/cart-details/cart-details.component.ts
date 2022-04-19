import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Item } from '../../models/cart';
import { ItemToUpdateIncart } from '../../models/item-to-update-in-cart';
import { ProductsEndpointsService } from '../../services/products-endpoints.service';
import * as productActions from '../../store/products.actions';
import { getCart, getCartIsEmpty, getIsComponentLoading, getOrderIsQuoted } from '../../store/products.selectors';

@Component({
  selector: 'cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cart$ = this.store.pipe(select(getCart));
  isComponentLoading$ = this.store.pipe(select(getIsComponentLoading));
  getOrderIsQuoted$ = this.store.pipe(select(getOrderIsQuoted));
  getCartIsEmpty$ = this.store.pipe(select(getCartIsEmpty));

  indexUpdating: number = null;
  subTotal: number = 0;
  tax: number = 0;
  spinnerSubscription: Subscription;
  subscription: Subscription;
  date: Date = null;
  time: string;
  dateError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private store: Store,
    private productEndpoints: ProductsEndpointsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(productActions.getCart());
    this.setDateFromCart();
  }

  setDateFromCart(): void {
    this.subscription = this.cart$.subscribe(cart => {
      if(cart !== null) {
        if(cart.prefereDelivery) {
          const dateString: string = cart.prefereDelivery;
          const dateSubstring = dateString.split('T')[0];
          const dateFromCart = dateSubstring.replace(/-/g, ',');
          this.date = new Date(dateFromCart);
          this.compareCartDate()
        }
      }
    })
  }

  compareCartDate(): void {
    if (this.date) {
      this.dateError = this.date.getTime() < new Date().getTime()
    }
  }

  ngOnDestroy(): void {
    if(this.spinnerSubscription) {
      this.spinnerSubscription.unsubscribe();
    }
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  selectingDate(): void {
    let today = new Date();
    if(this.date.getTime() < today.getTime()) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
    this.selectingTime()
  }

  selectingTime(): void {
    if (this.time) {
      const hour = parseInt(this.time.split(':')[0]) 
      const minutes = parseInt(this.time.split(':')[1]) 
      this.date.setHours(hour, minutes)
    } 
  }

  addOneToQuantity(item: Item, index: number): void {
    const itemToUpdate: ItemToUpdateIncart = {
      ItemId: item.id,
      Quantity: item.quantity + 1
    }
    this.updateQuantity(itemToUpdate, index);
  }

  substractOneToQuantity(item: Item, index: number): void {
    const itemToUpdate: ItemToUpdateIncart = {
      ItemId: item.id,
      Quantity: item.quantity - 1
    }
    this.updateQuantity(itemToUpdate, index);
  }

  private updateQuantity(itemToUpdate: ItemToUpdateIncart, index: number): void {
    this.indexUpdating = index;
    this.store.dispatch(productActions.updateItemInCart({payload: itemToUpdate}));
  }

  deleteFromCart(id: string): void {
    this.store.dispatch(productActions.deleteFromCart({id}));
  }

  quoteOrder(): void {
    this.store.dispatch(productActions.quoteOrder())
  }

  confirmOrder(): void {
    const preferedDate = this.date.toISOString();
    this.isLoading = true;
    this.subscription = this.productEndpoints.confirmOrder(preferedDate).subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['/products-cart/order-confirmation']);
    });
  }
}
