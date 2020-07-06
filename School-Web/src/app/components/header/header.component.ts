import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isAuthenticated: boolean;
  title: string;
  constructor(private titleService: Title) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.title = this.titleService.getTitle();
  }

}
