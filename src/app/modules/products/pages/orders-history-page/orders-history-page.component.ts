import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { applyFilter } from 'src/utils/apply-filters';
import { modalConfigOpt } from 'src/utils/const';
import { extraSimpleDate } from 'src/utils/extract-simple-date';
import { Order } from '../../models/order';
import { OrdersFilter } from '../../models/orders-filter';
import * as productActions from '../../store/products.actions';
import { getIsLoading, getOrders, getTotalOfPages } from '../../store/products.selectors';

@Component({
  selector: 'app-orders-history-page',
  templateUrl: './orders-history-page.component.html',
  styleUrls: ['./orders-history-page.component.scss']
})
export class OrdersHistoryPageComponent implements OnInit {

  orders$ = this.store.pipe(select(getOrders));
  isLoading$ = this.store.pipe(select(getIsLoading));
  totalOfPages$ = this.store.pipe(select(getTotalOfPages));
  modalRef: BsModalRef;
  currentPage: number = 1;
  query: string = '';
  spinnerSubscription: Subscription;
  selectedOrder: Order = null;
  filterApplied: OrdersFilter = new OrdersFilter();
  startDate: Date = null;
  endDate: Date = null;
  statusKey = ['En Carrito', 'Cancelada', 'En Proceso', 'Aprobada'];
  statusValue = [-1, 0, 1, 2];
  statusSelected: string = null;

  constructor(
    private modalService: BsModalService,
    private store: Store,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.showSpinner();
    this.store.dispatch(productActions.loadOrders({
      page: this.currentPage, 
      query: this.query
    }))
  }

  showSpinner(): void {
    this.spinnerSubscription = this.isLoading$.subscribe(isProductLoading => {
      if(isProductLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

  printOrder(order: Order): void {
    localStorage.setItem('order-to-print', JSON.stringify(order))
    const orderToPrintPopUp = window.open(
      '#/print-order', 
      'order-to-print', 
      `height=600, width=800, left=${window.screen.width / 4}`
    )
    setTimeout(() => {
      orderToPrintPopUp.close()
      localStorage.removeItem('order-to-print')
    }, 4000)
  }

  seeOrderDetails(order: Order, template: TemplateRef<any>): void {
    this.selectedOrder = order;
    this.openModalWithClass(template);
  }

  openModalWithClass(template: TemplateRef<any>):void {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg scrollable', ...modalConfigOpt })
    );
  }

  onChangePage(page: number): void {
    this.currentPage = page;
    this.store.dispatch(productActions.loadOrders({
      page: this.currentPage, 
      query: this.query
    }))
  }

  setStatus(statusSelected: string, statusvalue: number): void {
    this.statusSelected = statusSelected;
    this.filterApplied.Status = statusvalue;
  }

  selectingInitialDate(): void {
    const isoStringDate = this.startDate.toISOString();
    this.filterApplied.DateStart = extraSimpleDate(isoStringDate);
  }

  selectingEndDate(): void {
    const isoStringDate = this.endDate.toISOString();
    this.filterApplied.DateEnd = extraSimpleDate(isoStringDate);
  }

  searchWithFilters(): void {
    this.query = applyFilter(this.filterApplied);
    this.store.dispatch(productActions.loadOrders({
      page: this.currentPage, 
      query: this.query
    }))
  }

  resetFilters(): void {
    this.statusSelected = null;
    this.startDate = null;
    this.endDate = null;
    this.filterApplied = new OrdersFilter();
    this.searchWithFilters();

    this.store.dispatch(productActions.loadOrders({
      page: this.currentPage, 
      query: this.query
    }))
  }

}
