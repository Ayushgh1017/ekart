import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../models/IResponse';
import { IRequest } from '../models/IRequest';
import { EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  event = new EventEmitter<string>();
  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(this.isAuthenticated());
  }

  private isAuthenticated(): boolean {
    const username = this.getfromStorage('loggedInUser');
    return !!username && localStorage.getItem(username) !== null;
  }

  login(request:IRequest): Observable<IResponse> {
    let username = request.username;
    let password = request.password;
    return this.http.post<IResponse>(this.apiUrl, {username,password }).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('loggedInUser', request.username);
          this.setInStorage(response)
          this._isLoggedIn$.next(true);
          return response;
        }
        else{
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

  getfromStorage(input:string){
    return localStorage.getItem(input)
  }

  removeFromStorage(input:string){
    return localStorage.removeItem(input);
  }
  
  logout(): void {
    const loggedInUser = this.getfromStorage('loggedInUser');
    if (loggedInUser) {
      this.removeFromStorage('loggedInUser')
    }
    this.removeFromStorage('authToken');
    this._isLoggedIn$.next(false);
  }

  getUsername(): Observable<string> {
    const loggedInUser = this.getfromStorage('loggedInUser');
    return of(loggedInUser || '');
  }

}
