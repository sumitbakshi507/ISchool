export class AuthRequest {
  email: string;
  password: string;
  organization: string;
  source: string;
  constructor(
    email: string,
    password: string,
    orgzanization: string,
    source: string
    )
  {
    this.email = email;
    this.password = password;
    this.organization = orgzanization;
    this.source = source;
  }
}
