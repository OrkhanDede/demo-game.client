import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ACCOUNT_URLS, USER_URLS } from 'src/app/constants/urls';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  user: any = null;
  companyAccessibleSections: Array<any> = [];
  appOptions: Object | null = {};
  async getAuthUser(): Promise<any> {
    return new Promise(async (resolve) => {
      var userResponse: any = await this.http
        .get(ACCOUNT_URLS.USER_INFO_URL)
        .toPromise();
      this.user = userResponse.result;
      resolve(this.user);
    });
  }
  getAuthorizedUserAccessibleTables() {
    return this.http.get(ACCOUNT_URLS.GET_AUTH_USER_ACCESSIBLE_SECTIONS_URL);
  }

  getUserInfo() {
    return this.user;
  }
  getUserId() {
    return this.user.id;
  }
  getUserName() {
    return this.user.username;
  }
  getUserShortFullname() {
    let user = this.getUserInfo();
    let fullnameArray = user?.fullname?.split(' ');
    let shortName =
      fullnameArray[0][0].toUpperCase() + fullnameArray[1][0].toUpperCase();
    return shortName;
  }

  getToken(emailOrUsername: string, password: string): Promise<any> {
    const data = {
      emailOrUsername,
      password,
    };
    return this.http.post(ACCOUNT_URLS.GET_TOKEN, data).toPromise();
  }
  getRefreshToken() {
    return this.http.get(ACCOUNT_URLS.GET_REFRESH_TOKEN).toPromise();
  }
  removeToken() {
    return this.http.post(ACCOUNT_URLS.POST_REMOVE_TOKEN_URL, {}).toPromise();
  }
  signOut() {
    return this.http.get(ACCOUNT_URLS.GET_SIGN_OUT).toPromise();
  }
  postAuth(emailOrUsername: string, password: string): Promise<any> {
    const data = {
      emailOrUsername,
      password,
    };
    return this.http.post(ACCOUNT_URLS.POST_AUTH, data).toPromise();
  }
  async login(username: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.postAuth(username, password)
        .then((tokenResponse: any) => {
          var token = tokenResponse.result.token;
          if (token) {
            this.tokenService.setToken(token);
          }
          resolve(tokenResponse);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async refreshToken(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.getRefreshToken()
        .then((tokenResponse: any) => {
          var token = tokenResponse.result.token;
          this.tokenService.setToken(token);
          if (token) {
            let isWebView = localStorage.getItem('web-view');
            if (isWebView && isWebView == 'true') {
              this.removeToken()
                .then(() => {
                  console.warn('tokenChanged');
                  resolve(tokenResponse);
                })
                .catch((error) => {
                  throw new Error(error);
                });
            } else {
              console.warn('tokenChanged');
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  resetAndRedirectToLogin() {
    this.user = null;
    this.tokenService.removeToken();
    this.router.navigateByUrl('/auth/login');
  }

  async logout(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.tokenService.removeToken();
      this.user = null;
      this.router.navigateByUrl('/auth');
    });
  }
  getAuthUserToken() {
    return 'Bearer ' + this.tokenService.getToken();
  }

  canAccessToCompanyTable(companyId: number, tableName: string) {
    return this.http.get(
      ACCOUNT_URLS.CAN_ACCESS_TO_SECTION_URL(companyId, tableName)
    );
  }
  async isAuthenticated(): Promise<any> {
    return new Promise(async (resolve) => {
      var token = this.tokenService.getToken();

      if (token) {
        if (!this.user) {
          await this.getAuthUser();
        }
        resolve(true);
      } else resolve(false);
    });
  }

  async sendConfirmationCode(username: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.postConfirmationCode(username)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async verifyConfirmationCode(username: string, code: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.postVerifyConfirmationCode(username, code)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async passwordReset(
    emailOrUsername: string,
    password: string,
    code: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.postPasswordReset(emailOrUsername, password, code)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private postConfirmationCode(emailOrUsername: string): Promise<any> {
    const data = {
      emailOrUsername,
    };

    return this.http
      .post(ACCOUNT_URLS.POST_SEND_CONFIRMATION_CODE_PASSWORD_RESET, data)
      .toPromise();
  }

  private postVerifyConfirmationCode(
    emailOrUsername: string,
    code: string
  ): Promise<any> {
    const data = {
      emailOrUsername,
      code,
    };

    return this.http
      .post(ACCOUNT_URLS.POST_SEND_VERIFY_CODE_PASSWORD_RESET, data)
      .toPromise();
  }

  private postPasswordReset(
    emailOrUsername: string,
    password: string,
    code: string
  ): Promise<any> {
    const data = {
      emailOrUsername,
      password,
      code,
    };

    return this.http
      .post(ACCOUNT_URLS.POST_SEND_PASSWORD_RESET, data)
      .toPromise();
  }
  startImpersonate(userId: string): Observable<Object> {
    return new Observable<Object>((subscriber) => {
      const params = {
        userId,
      };
      this.http.get(ACCOUNT_URLS.START_IMPERSONATE_URL, { params }).subscribe(
        (response: any) => {
          var currentToken = this.tokenService.getToken();
          if (currentToken) {
            this.tokenService.setImpersonaterToken(currentToken);
          }
          var token = response.result;
          this.tokenService.setToken(token);
          subscriber.next({ token });
        },
        (err) => {
          subscriber.error(err);
        }
      );
    });
  }
  stopImpersonate(): Observable<Object> {
    return new Observable<Object>((subscriber) => {
      this.http
        .get(ACCOUNT_URLS.STOP_IMPERSONATE_URL)
        .subscribe((response: any) => {
          var impersonaterToken = this.tokenService.getImpersonaterToken();
          if (impersonaterToken) {
            this.tokenService.setToken(impersonaterToken);
          } else {
            this.tokenService.removeToken();
          }

          this.tokenService.removeImpersonaterToken();
          subscriber.next();
        });
    });
  }
  async changePassword(
    oldPassword: string,
    password: string,
    confirmPassword: string
  ): Promise<any> {
    const data = {
      oldPassword,
      password,
      confirmPassword,
    };
    return this.http.put(USER_URLS.POST_CHANGE_PASSWORD, data).toPromise();
  }
}
