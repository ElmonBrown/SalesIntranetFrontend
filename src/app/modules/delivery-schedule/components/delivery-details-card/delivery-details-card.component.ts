import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Delivery } from '../../models/delivery';

@Component({
  selector: 'delivery-details-card',
  templateUrl: './delivery-details-card.component.html',
  styleUrls: ['./delivery-details-card.component.scss']
})
export class DeliveryDetailsCardComponent implements OnInit {

  @Input() delivery: Delivery
  @Input() showFullInfo: boolean

  constructor() { }

  ngOnInit(): void {
  }
}
