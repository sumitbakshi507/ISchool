import { UserType } from './../user.type.model';

export interface IAuthResponse {
  idToken: string;
  email: string;
  mobile: string;
  role: UserType;
  expiresIn: string;
  localId: string;
  fullName: string;
}
