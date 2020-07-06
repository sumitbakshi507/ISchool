import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthRequest } from '../models/auth.request.model';
import { AuthResponse } from '../models/auth.response.model';
import { IAuthResponse } from '../models/interfaces/auth.response.interface';
import { DeviceDetectorService } from 'ngx-device-detector';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { UserType } from '../models/user.type.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<AuthResponse>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {}

  login(authRequest: AuthRequest) {
    const deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    authRequest.organization = environment.defaultOrganization;
    authRequest.source = 'WEB';
    return this.http
      .post<IAuthResponse>(
        environment.api + 'auth-api/Login',
        authRequest
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            +resData.expiresIn,
            resData.idToken,
            resData.localId,
            resData.mobile,
            resData.role);
        })
      );
  }

  private handleAuthentication(
    email: string,
    expiresIn: number,
    idToken: string,
    localId: string,
    mobile: string,
    role: UserType
    ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new AuthResponse(email, localId, mobile, role, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: AuthResponse = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new AuthResponse(
      userData.email,
      userData.userId,
      userData.mobile,
      userData.role,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.Message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      default:
          errorMessage = errorRes.message;
          break;
    }
    return throwError(errorMessage);
  }
}
