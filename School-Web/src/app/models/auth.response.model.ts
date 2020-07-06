import { UserType } from './user.type.model';

export class AuthResponse {
  email: string;
  userId: string;
  mobile: string;
  role: UserType;
  // tslint:disable-next-line:variable-name
  _token: string;
  // tslint:disable-next-line:variable-name
  _tokenExpirationDate: Date;

constructor(
  email: string,
  userId: string,
  mobile: string,
  role: UserType,
  // tslint:disable-next-line:variable-name
  _token: string,
  // tslint:disable-next-line:variable-name
  _expirationDate: Date
) {
  this.email = email;
  this.userId = userId;
  this.mobile = mobile;
  this.role = role;
  this._token = _token;
  this._tokenExpirationDate = _expirationDate;
}

get token() {
  if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    return null;
  }
  return this._token;
}
}
