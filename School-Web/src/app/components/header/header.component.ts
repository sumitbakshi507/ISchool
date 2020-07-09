import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../services/auth.service';
import { AuthResponse } from './../../models/auth.response.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isAuthenticated: boolean;
  title: string;
  user: AuthResponse;
  constructor(private titleService: Title,
              private authService: AuthService) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.title = this.titleService.getTitle();
    this.authService.user.subscribe(resp => {
        this.user = resp;
    });
  }

  onLogOut() {
    console.log('onLogOut');
    this.authService.logout();
  }
}
