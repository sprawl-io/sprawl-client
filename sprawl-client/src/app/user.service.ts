import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private loggedIn = false;

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username, password): Observable<boolean> {

    const base64Creds = btoa(username + ':' + password);
    const authHeader = 'Basic ' + base64Creds;

    const headers = {
      headers: new HttpHeaders({
        'Authorization': authHeader
      }),
      observe: 'response' as 'body'
    };

    return this.http.get<HttpResponse<any>>('//localhost:8080/api/auth/login', headers)
      .map((resp: any): boolean => {
        if (resp.status === 200) {
          localStorage.setItem('auth_token', authHeader);
          this.loggedIn = true;
        }
        return resp.ok;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
