import { LoginModel, User } from './../models/login.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/OperatorS';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user!: User;
 

  get user(){
    return { ...this._user };
  }

  constructor(
    private http: HttpClient,
    private router: Router 
  ) { }

  private baseURL: String = environment.baseUrl;

  isLogged(): any {
    return !!localStorage.getItem('token');
  }

  login( User: string, Password: string ) {

    const url = `${environment.baseUrl}/security/api/auth/signin`;
    const body = { user: User, password: Password }

    return this.http.post<LoginModel>(url, body)
    .pipe(
      tap( resp => {
        if (resp.token){
          localStorage.setItem('token', resp.token!);
        }
      }),
      map(resp => resp ),
      catchError( err => of(err) )
    );
  }

  get(rnc: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.baseURL}/customer/${rnc}`, {observe: 'response'});
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
  
  getToken(): string {
    return localStorage.getItem('token');
  }


}
