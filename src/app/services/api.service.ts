import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUsers } from '../models/IUsers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://fakestoreapi.com/users';
  private users: IUsers[] = [];

  constructor(private http: HttpClient) {
    this.fetchUserCredentials().subscribe(credentials => {
      this.users = credentials;
    });
  }

  fetchUserCredentials(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.apiUrl).pipe(
      map(users => users.map(user => ({ username: user.username, password: user.password })))
    );
  }

  getUserCredentials(): IUsers[] {
    return this.users;
  }
}
