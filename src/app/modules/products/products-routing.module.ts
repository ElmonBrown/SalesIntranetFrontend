import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsCatalogPageComponent } from './components/products-catalog-page/products-catalog-page.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductCategoriesPageComponent } from './components/product-categories-page/product-categories-page.component';
import { OrdersHistoryPageComponent } from './pages/orders-history-page/orders-history-page.component';
import { CurrentOrderPageComponent } from './pages/current-order-page/current-order-page.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { PrintOrderPageComponent } from './pages/print-order-page/print-order-page.component';


const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductCategoriesPageComponent },
      { path: 'categories', component: ProductCategoriesPageComponent },
      { path: 'catalog/:id', component: ProductsCatalogPageComponent },
    ],
    data: { title: 'Productos' }
  },
  {
    path: 'products-cart',
    component: CartPageComponent,
    children: [
      { path: '', component: CartDetailsComponent },
      { path: 'order-confirmation', component: OrderConfirmationComponent }
    ],
    data: { title: 'Carrito' }
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    data: { title: 'Detalles de Producto' }
  },
  {
    path: 'orders-history',
    component: OrdersHistoryPageComponent,
    data: { title: 'Historial de Órdenes' }
  },
  {
    path: 'print-order',
    component: PrintOrderPageComponent,
    data: { title: 'Imprimir Orden' }
  },
  {
    path: 'current-order',
    component: CurrentOrderPageComponent,
    data: { title: 'Orden en Curso' }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
  static components = [
  ];

}
