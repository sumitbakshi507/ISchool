import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../services/auth.service';
import { AuthResponse } from './../../models/auth.response.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isAuthenticated: boolean;
  title: string;
  user: AuthResponse;
  menus: Array<string>;
  menuSubs: Subscription;
  constructor(private titleService: Title,
              private route: Router,
              private authService: AuthService,
              private translate: TranslateService) {
    this.isAuthenticated = false;
    this.menus = [];
  }

  ngOnInit(): void {
    this.title = this.titleService.getTitle();
    this.translate.get('main.title').subscribe(title => {
      this.title = title;
    });
    this.authService.user.subscribe(resp => {
        this.user = resp;
        if (this.user != null) {
          console.log('load menus for ' + this.user.role);
          this.menuSubs = this.authService.loadMenus().subscribe(respMenus => {
            this.menus = (respMenus);
          });
        }
    });
  }

  onLogOut() {
    console.log('onLogOut');
    this.authService.logout();
  }
  menuClick(menu: string) {
    console.log(menu);
    this.route.navigate([menu]);
  }

  ngOnDestroy() {
    if (this.menuSubs) {
      this.menuSubs.unsubscribe();
    }
  }
}
