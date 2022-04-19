import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseURL: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.baseURL}/region`, {observe: 'response'});
  }

  create(value: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseURL}/customer/Create`,
   value,
    {observe: 'response'})
  }
}
