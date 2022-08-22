import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_URLS } from 'src/app/constants/urls';
import { paramMaker } from 'src/app/utils/paramMaker';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(params?: any) {
    return this.http.get(USER_URLS.GET_ALL_URL, {
      params: paramMaker(params),
    });
  }
  getUser(id: string, params?: any) {
    return this.http.get(USER_URLS.GET_USER_URL(id), {
      params: paramMaker(params),
    });
  }
  getUserPositions(id: string, params?: any) {
    return this.http.get(USER_URLS.GET_USER_POSITIONS_URL(id), {
      params: paramMaker(params),
    });
  }
}
