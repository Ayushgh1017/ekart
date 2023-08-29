import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../models/IResponse';
import { IRequest } from '../models/IRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();


  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(this.isAuthenticated());
  }

  private isAuthenticated(): boolean {
    const username = localStorage.getItem('loggedInUser');
    return !!username && localStorage.getItem(username) !== null;
  }

  login(request:IRequest): Observable<IResponse> {
    let username = request.username;
    let password = request.password;
    return this.http.post<any>(this.apiUrl, {username,password }).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('loggedInUser', request.username);
          this.setInStorage(response)
          this._isLoggedIn$.next(true);
          return response;
        }
      })
    );
  }

  setInStorage(res:IResponse){
    if(res){
      localStorage.setItem('authToken', res.token);
    }
  }

  
  logout(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      localStorage.removeItem('loggedInUser');
    }
    localStorage.removeItem('authToken');
    this._isLoggedIn$.next(false);
  }

  getUsername():string{
    let name =  localStorage.getItem('loggedInUser');
    if(name){
      return name;
    }
    return '';
  }

}
