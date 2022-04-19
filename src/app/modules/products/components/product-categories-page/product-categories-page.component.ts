import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-categories-page',
  templateUrl: './product-categories-page.component.html',
  styleUrls: ['./product-categories-page.component.scss']
})
export class ProductCategoriesPageComponent implements OnInit {

  constructor() { }

  viewAllCategories: boolean = false;

  ngOnInit(): void {}

  toggleViewAllCategories(): void {
    if (!this.viewAllCategories) {
      this.viewAllCategories = true
    } else {
      this.viewAllCategories = false
    }
  }

}
