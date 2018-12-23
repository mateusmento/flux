import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserCredentials } from '../../../web-api/src/user/user.model';
import { Observable } from 'rxjs';

interface UserApiResponse
{
  error: boolean;
  msg?: string;
}

@Injectable()
export class UserService {

  baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient)
  {
  }

  createUser(user: User): Observable<UserApiResponse>
  {
    let url = this.baseUrl + '/create-user';
    return this.http.post<UserApiResponse>(url, user);
  }

  authenticateUser(credentials: UserCredentials): Observable<UserApiResponse>
  {
    let url = this.baseUrl + '/authenticate-user';
    return this.http.post<UserApiResponse>(url, credentials);
  }

  getUserByUsername(username: string): Observable<User>
  {
    let url = this.baseUrl + '/findby-username'
    return this.http.post<User>(url, {username});
  }

  getUserByEmail(email: string): Observable<User>
  {
    let url = this.baseUrl + '/findby-email'
    return this.http.post<User>(url, {email});
  }
}
