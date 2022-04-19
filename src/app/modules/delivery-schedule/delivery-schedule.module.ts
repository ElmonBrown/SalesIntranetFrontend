import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryScheduleRoutingModule } from './delivery-schedule-routing.module';
import { DeliveryListPageComponent } from './pages/delivery-list-page/delivery-list-page.component';
import { ClientModule } from '../client/client.module';
import { DeliveryDetailsCardComponent } from './components/delivery-details-card/delivery-details-card.component';



@NgModule({
  declarations: [DeliveryListPageComponent, DeliveryDetailsCardComponent],
  imports: [
    CommonModule,
    DeliveryScheduleRoutingModule,
    ClientModule
  ]
})
export class DeliveryScheduleModule { }
