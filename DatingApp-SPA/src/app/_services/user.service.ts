import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl + 'user/';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + id);
  }
}
