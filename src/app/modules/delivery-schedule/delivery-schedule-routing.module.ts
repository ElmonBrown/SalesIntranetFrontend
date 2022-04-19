import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryListPageComponent } from './pages/delivery-list-page/delivery-list-page.component';

const routes: Routes = [
  {
    path: 'delivery',
    component: DeliveryListPageComponent,
    data: { title: 'Cronograma de entrega' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryScheduleRoutingModule { 
  static components = [
  ];
}
