import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getIsLoading } from '../../store/products.selectors';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {

  isLoading$ = this.store.pipe(select(getIsLoading));
  spinnerSubscription: Subscription;

  constructor(
    private store: Store,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.showSpinner();
  }

  ngOnDestroy(): void {
    if(this.spinnerSubscription) {
      this.spinnerSubscription.unsubscribe();
    }
  }

  showSpinner(): void {
    this.spinnerSubscription = this.isLoading$.subscribe(isProductLoading => {
      if(isProductLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

}
