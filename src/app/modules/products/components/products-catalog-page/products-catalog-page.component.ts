import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as productsActions from '../../store/products.actions';
import { getProducts, getTotalOfPages } from '../../store/products.selectors';

const initialPage: number = 1;

@Component({
  selector: 'app-products-catalog-page',
  templateUrl: './products-catalog-page.component.html',
  styleUrls: ['./products-catalog-page.component.scss']
})

export class ProductsCatalogPageComponent implements OnInit {

  currentPage: number = initialPage;
  categoryId: string = '';
  filterApplied: ProductFilter = new ProductFilter();
  fullText: string = '';
  query: String = '';
  products$ = this.store.pipe(select(getProducts));
  totalOfPages$ = this.store.pipe(select(getTotalOfPages));

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.categoryId = this.route.snapshot.params.id;
    this.currentPage = parseInt(this.route.snapshot.queryParams.page);
    this.store.dispatch(productsActions.loadProducts(
      {categoryId: this.categoryId , page: this.currentPage, query: this.query}
    ));
  }
 
  reloadProducts(page: number = this.currentPage): void {
    this.currentPage = page;
    this.store.dispatch(productsActions.loadProducts(
      {categoryId: this.categoryId , page: page, query: this.query}
    ));
  }

  onChangePage(page: number): void {
    this.currentPage = page;
    this.reloadProducts();
    this.updateRouteQueryParams(page);
  }

  //This is just for routing and sharing purposes
  private updateRouteQueryParams(page: number): void {
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: { ...this.route.snapshot.queryParams, page: page },
        queryParamsHandling: 'merge'
      }
    );
  }

  setMin(min: number): void {
    this.filterApplied.Min = min;
  }

  setMax(max: number): void {
    this.filterApplied.Max = max;
  }

  setTag(tag: string): void {
    this.filterApplied.Tag = tag;
  }

  tagGenerate(): string[] {
    const tags = ['Especial', 'Nuevo'];
    return tags;
  }

  minMaxGenerate(): number[] {
    const topRange: number = 100;
    const multiplyBy: number = 1000;
    const priceOptions: number[] = [0];

    for (let index = 1; index < topRange; index++) {
      priceOptions.push(index * multiplyBy);
    }
    return priceOptions;
  }

  fullTextSearch(): void {
    this.query = `&q=${this.fullText}`;
    this.reloadProducts(initialPage);
  }

  setFilters(): void {
    const keys: Array<String> = Object.keys(this.filterApplied);
    let queryString = '&';
    
    //Excluding empty and null fields
    const filteredKeys = keys.filter(key => 
      this.filterApplied[`${key}`] != null &&
      this.filterApplied[`${key}`] != ''
    );
    //Preparing queries
    filteredKeys.forEach(key => {
      const field: String = key;
      const value: any = this.filterApplied[`${key}`];
      queryString+= `${field}=${value}&`;
    });

    queryString = queryString.slice(0, queryString.length -1);
    this.query = queryString;
    this.updateRouteQueryParams(initialPage);
    this.reloadProducts(initialPage);
  }

  resetFilters(): void {
    this.query = '';
    this.filterApplied = new ProductFilter();
    this.reloadProducts(initialPage);
  }

  categoryName(): string {
    switch (this.categoryId) {
      case '01':
        return 'Industrial'
      case '02':
        return 'Pintura y adhesivos'
      case '03':
        return 'Plásticos'
      case '04':
        return 'Construcción'
      case '05':
        return 'Ferretería'
      case '06':
        return 'Agricultura y pecuaria'
      default:
        return 'Categoría seleccionada'
    }
  }

}

class ProductFilter {
  Name: string;
  Presentation: string;
  Tag: string;
  Min: number;
  Max: number;

  constructor() {
    this.Name = '',
    this.Presentation = '',
    this.Tag = '',
    this.Min = null,
    this.Max = null
  }
}
