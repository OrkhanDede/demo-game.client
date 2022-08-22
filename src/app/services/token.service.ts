import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private tokenKey: string = 'auth_token';
  private impersonaterKey: string = 'impersonater_auth_token';
  setToken(value: string) {
    var tokenDate = new Date();
    localStorage.setItem('last-token-request', tokenDate.getTime().toString());
    localStorage.setItem(this.tokenKey, value);
  }
  setImpersonaterToken(value: string) {
    localStorage.setItem(this.impersonaterKey, value);
  }
  getToken() {
    var token = localStorage.getItem(this.tokenKey);
    if (!token) return '';
    return token;
  }
  getImpersonaterToken() {
    var token = localStorage.getItem(this.impersonaterKey);
    return token;
  }
  removeToken() {
    localStorage.removeItem('last-token-request');
    return localStorage.removeItem(this.tokenKey);
  }
  removeImpersonaterToken() {
    return localStorage.removeItem(this.impersonaterKey);
  }
  getTokenDecoded(): Object {
    var token = this.getToken();
    if (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url?.replace('-', '+').replace('_', '/');
      var obj = JSON.parse(atob(base64));
      return obj;
    }
    return {};
  }
}
