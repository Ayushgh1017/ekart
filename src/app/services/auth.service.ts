import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_PREFIX = 'authToken_'; // Prefix for token storage
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService) {
    this._isLoggedIn$.next(this.isAuthenticated());
  }

  private getLocalStorageTokenKey(username: string): string {
    return this.TOKEN_PREFIX + username;
  }

  private isAuthenticated(): boolean {
    const username = localStorage.getItem('loggedInUser');
    return !!username && localStorage.getItem(this.getLocalStorageTokenKey(username)) !== null;
  }

  login(username: string, password: string): Observable<boolean> {
    const userCredentials = this.apiService.getUserCredentials();
    const user = userCredentials.find(u => u.username === username && u.password === password);
  
    if (user) {
      localStorage.setItem('loggedInUser', username);
      localStorage.setItem(this.getLocalStorageTokenKey(username), 'dummyToken'); // Replace with your actual token
  
      this._isLoggedIn$.next(true);
  
      return new Observable<boolean>(observer => {
        observer.next(true);
        observer.complete();
      });
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }  
}
