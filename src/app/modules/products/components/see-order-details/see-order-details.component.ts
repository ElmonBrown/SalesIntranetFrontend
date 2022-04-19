import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Order } from '../../models/order';


@Component({
  selector: 'see-order-details',
  templateUrl: './see-order-details.component.html',
  styleUrls: ['./see-order-details.component.scss']
})
export class ISeeOrderDetailsComponent implements OnInit {

  @Input() modalRef: BsModalRef;
  @Input() order: Order;
  subTotal: number = 0;
  tax: number = 0;

  constructor() { }

  closeModal(): void {
    this.modalRef.hide();
  }

  ngOnInit(): void {}

}
