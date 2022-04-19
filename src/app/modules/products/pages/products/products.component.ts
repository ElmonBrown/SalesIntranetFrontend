import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { getIsLoading } from '../../store/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

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
