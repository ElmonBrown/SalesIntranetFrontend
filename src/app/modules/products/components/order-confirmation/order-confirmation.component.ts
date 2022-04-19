import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PayMethod } from '../../models/pay-method';
import * as productActions from '../../store/products.actions';
import { getCart } from '../../store/products.selectors';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {

  cart$ = this.store.pipe(select(getCart));
  subTotal: number = 0;
  transferAmount: number = null;
  transferFile: File = null;
  isLoading: boolean = false;
  susbcription: Subscription;
  tax: number = 0.18; //HARDCODED SHOULD COME FROM BE]
  paymentTypeSelected: PayMethod = null;
  imageLoaded = null;

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.store.dispatch(productActions.getCart());
  }

  ngOnDestroy(): void {
    if(this.susbcription) {
      this.susbcription.unsubscribe();
    }
  }

  finishOrder(): void {
    if(this.paymentTypeSelected === 'transfer') {
      if(this.transferAmount === null || this.transferFile === null) {
        this.toastr.warning('Debe subir la constancia de transferencia y agregar el monto');
        return
      }
      this.orderWithTransfer();
    }
  }

  private orderWithTransfer(): void {
    const formData = new FormData();
    formData.append('Amount', this.transferAmount.toString());
    formData.append('File', this.transferFile);
    this.store.dispatch(productActions.transfer({fd: formData}));
  }

  backtoCart(): void {
    this.router.navigate(['/products-cart']);
  }

  onDropped(files: FileList):void {
    const file: File = files[0];
    if(!this.correctFileExtension(file)) {
      this.toastr.error('Tipo de archivo incorrecto. Use un jpg', 'ERROR');
      return;
    }
    this.transferFile = file;
    this.createURLobject(file);
  }

  private correctFileExtension(file: File): boolean {
    const fileName: string = file.name;
    const wordsSeratedByPeriod: string[] = fileName.split('.');
    const lastWordIndex = wordsSeratedByPeriod.length;
    const fileExt: string = wordsSeratedByPeriod[lastWordIndex - 1];
    return fileExt == 'jpg';
  }

  private createURLobject(file: File): void {
    this.imageLoaded = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  removePhoto(): void {
    this.imageLoaded = null;
    this.transferFile = null;
  }
}
