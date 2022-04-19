import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type NewType = Observable<HttpResponse<any>>;

@Injectable({
  providedIn: 'root'
})
export class TransferRejectdService {

  private baseURL: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  create(value: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseURL}order/cancelation/`,
    {
      "CodeSAP" : value,
      "Reason": "Transferencia no valida"
  },
    {observe: 'response'})
  }
}
