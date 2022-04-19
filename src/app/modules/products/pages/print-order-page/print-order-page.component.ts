import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Order } from '../../models/order';


@Component({
  selector: 'print-order-page',
  templateUrl: './print-order-page.component.html',
  styleUrls: ['./print-order-page.component.scss']
})
export class PrintOrderPageComponent implements OnInit, AfterContentInit {

  orderParsed: Order;

  constructor() {
    const orderString = localStorage.getItem('order-to-print')
    this.orderParsed = JSON.parse(orderString)
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    setTimeout(() => {
      window.print()
    }, 2500)
  }
}