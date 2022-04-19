import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientModule } from '../client/client.module';
import { ProductsCatalogPageComponent } from './components/products-catalog-page/products-catalog-page.component';
import { ProductsRoutingModule } from './products-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { StoreModule } from '@ngrx/store';
import * as productsStoreModule from './store/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products.effects';
import { ProductCategoriesPageComponent } from './components/product-categories-page/product-categories-page.component';
import { TagComponent } from './components/tag/tag.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrdersHistoryPageComponent } from './pages/orders-history-page/orders-history-page.component';
import { CurrentOrderPageComponent } from './pages/current-order-page/current-order-page.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ISeeOrderDetailsComponent } from './components/see-order-details/see-order-details.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { SupensiveDotsPipe } from 'src/app/modules/products/pipes/supensive-dots.pipe';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { PrintOrderPageComponent } from './pages/print-order-page/print-order-page.component';

defineLocale('ar', deLocale);

@NgModule({
  declarations: [
    ProductsCatalogPageComponent,
    CartPageComponent,
    ProductDetailComponent,
    ProductCategoriesPageComponent,
    ProductsComponent,
    TagComponent,
    PaginationComponent,
    OrdersHistoryPageComponent,
    CurrentOrderPageComponent,
    OrderConfirmationComponent,
    CartDetailsComponent,
    ISeeOrderDetailsComponent,
    SupensiveDotsPipe,
    DragAndDropDirective,
    PrintOrderPageComponent
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    ClientModule,
    FormsModule,
    ProductsRoutingModule,
    StoreModule.forFeature(
      productsStoreModule.featureKey, 
      productsStoreModule.productsReducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule { }
