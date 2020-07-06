import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { AuthRequest } from '../../../models/auth.request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  loginSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['sumit.bakshi507@gmail.com', Validators.email],
      password: ['a123456', Validators.required]
    });
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        const authRequest = new AuthRequest(username, password, 'test', 'test');

        this.loginSubscription = this.authService.login(authRequest).subscribe(resp => {
          console.log('Success');
          console.log(resp);
        },
        (err) => {
          console.log(err);
          this.loginInvalid = true;
        });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
