import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/singup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  private domain = '';
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken()
    //username: this.getUserName()
  }

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
    this.domain = environment.apiDomain;
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(this.domain + '/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.domain + '/api/auth/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('access_token', data.access_token);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refresh_token', data.refresh_token);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        sessionStorage.setItem('isLoggedIn', 'true');

        return true;
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('access_token');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>(this.domain + '/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('access_token');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('access_token',
          response.access_token);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    this.httpClient.post(this.domain + '/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('access_token');
    this.localStorage.clear('username');
    this.localStorage.clear('refresh_token');
    this.localStorage.clear('expiresAt');
    sessionStorage.setItem('isLoggedIn', 'false');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refresh_token');
  }

  isLoggedIn(): boolean {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn == null) {
      console.log('isLoggedIn: ' + isLoggedIn);
      return false;
    } else {
      console.log('isLoggedIn: ' + isLoggedIn + " jwt: " + this.getJwtToken());
      return this.getJwtToken() != null;
    }
  }
}
