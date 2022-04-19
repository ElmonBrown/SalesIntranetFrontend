import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ItemToCart } from '../../models/item-to-cart';
import { Presentation, ProductDetail } from '../../models/product-detail';
import * as productActions from '../../store/products.actions';
import { getSelectedProduct } from '../../store/products.selectors';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: ProductDetail;
  selectedPresentation: Presentation = null;
  quantitySelected: number = 1;
  quantityDisplayed: number[] = Array<number>();
  @Input() previousRouteQuery: String;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.store.dispatch(productActions.loadOneProduct({id}));
    this.store.pipe(select(getSelectedProduct)).subscribe(
      (selectedProduct) => {
        if(selectedProduct) {
          this.product = selectedProduct;
          this.selectedPresentation = selectedProduct.presentations[0];
          this.quantityDisplayed = 
              this.createArrayOfQuantity(this.selectedPresentation.stock);
        }
      } 
    );
  }

  backToPreviousPage(): void {
    this.location.back();
  }

  addToCart():void {
    const itemToCart: ItemToCart = {
      CatalogoCode: this.product.code,
      PresentationCode: this.selectedPresentation.code,
      Quantity: this.quantitySelected
    }

    this.store.dispatch(productActions.addToCart({payload: itemToCart}))
  }

  addAndJumpToCart(): void {
    this.addToCart();
    this.router.navigate(['/products-cart']);
  }

  onChangeSelectedTag(presentation: Presentation): void {
    this.selectedPresentation = presentation;
    this.quantityDisplayed = 
        this.createArrayOfQuantity(this.selectedPresentation.stock);
  }

  changeQuantity(quantity: number): void {
    this.quantitySelected = quantity;
  }

  private createArrayOfQuantity(quantity: number): number[] {
    const quantityDisplayed = Array<number>();
    for (let index = 1; index <= quantity; index++) {
      quantityDisplayed.push(index);
    }
    return quantityDisplayed;
  }

}
