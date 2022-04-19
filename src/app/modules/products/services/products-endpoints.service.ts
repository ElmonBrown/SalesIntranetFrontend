import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ORDERS_LIMIT, PRODUCT_LIMIT } from 'src/utils/const';
import { Cart } from '../models/cart';
import { ItemToCart } from '../models/item-to-cart';
import { ItemToUpdateIncart } from '../models/item-to-update-in-cart';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsEndpointsService {

  private baseURL = environment.baseUrl;
  private limit = ORDERS_LIMIT;

  constructor(private http: HttpClient) { }

  getAll(
    categoryId: string, 
    page: number = 1, 
    query: String
    ): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(
      // `${this.baseURL}/api/catalogue/list/${categoryId}?_page=${page}&_limit=${PRODUCT_LIMIT}${query}`,
      `${this.baseURL}/api/catalogue/list/${categoryId}`, 
      {observe: 'response'}
    );
  }

  getOne(id: String): Observable<HttpResponse<Product>> {
    return this.http.get<Product>(`${this.baseURL}/api/catalogue/detail/${id}`, 
      {observe: 'response'}
    );
  }

  getOneFromCart(id: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.baseURL}/api/shoppingcar/item/${id}`, {observe: 'response'})
  }

  addItemToCart(item: ItemToCart): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.baseURL}/api/shoppingcar/item`, 
      item, 
      {observe: 'response'}
    )
  }

  updateItemInCart(item: ItemToUpdateIncart): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `${this.baseURL}/api/shoppingcar/item`, 
      item, 
      {observe: 'response'}
    )
  }

  deleteOneFromCart(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(
      `${this.baseURL}/api/shoppingcar/item/${id}`, 
      {observe: 'response'}
    )
  }

  getCart():Observable<HttpResponse<Cart>> {
    return this.http.get<Cart>(`${this.baseURL}/api/shoppingcar/`, {observe: 'response'})
  }

  quoteOrder(): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.baseURL}/api/shoppingcar/quotation`, 
      null, 
      {observe: 'response'}
    )
  }

  confirmOrder(PrefereDelivery: string): Observable<HttpResponse<any>> {
    const confirm = {PrefereDelivery}
    return this.http.post<any>(
      `${this.baseURL}/api/shoppingcar/confirm`, 
      confirm,
      {observe: 'response'}
    );
  }

  transfer(fd: FormData): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.baseURL}/api/shoppingcar/payment/transfer`, 
      fd, 
      {observe: 'response'}
    )
  }

  finishOrder(): Observable<HttpResponse<any>> {
    return this.http.post(
      `${this.baseURL}/api/shoppingcar/finish`, 
      null, 
      {observe: 'response'}
    )
  }

  getOrders(page: number, query: string): Observable<HttpResponse<Order[]>> {
    const skip = this.limit * (page - 1);
    return this.http.get<Order[]>(
      `${this.baseURL}/api/order/search/detail?Take=${this.limit}&Skip=${skip}${query}`,
      {observe: 'response'} 
    )
  }

}
