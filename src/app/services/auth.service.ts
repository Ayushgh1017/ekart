import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  key:string='';
  constructor(private apiService: ApiService) {
    this._isLoggedIn$.next(this.isAuthenticated());
  }

 

  private isAuthenticated(): boolean {
    const username = localStorage.getItem('loggedInUser');
    return!!username && localStorage.getItem(username)!== null;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.apiService.login(username, password).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('loggedInUser', username);
          const token = response;
          localStorage.setItem('auth', token);
          this._isLoggedIn$.next(true);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('auth');
    
    this._isLoggedIn$.next(false);
  }


  getToken(): string {
    const username = localStorage.getItem('loggedInUser');
    return username? localStorage.getItem(username) || '' : '';
  }
}