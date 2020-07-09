import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AuthResponse } from './models/auth.response.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Exam Center';
  userSubs: Subscription;
  isAuthenticated: boolean;
  constructor(
    private authService: AuthService,
    private route: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.titleService.setTitle('Welcome to Online School');
    this.userSubs = this.authService.user.subscribe((user: AuthResponse) => {
      this.isAuthenticated = !!user;
      if (!this.isAuthenticated) {
        this.route.navigate(['auth']);
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }
}
