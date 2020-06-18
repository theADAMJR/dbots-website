import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardComponent {
  get user() { return this.userService.user; }

  constructor(
    seo: SEOService,
    private userService: UserService) {
    seo.setTags({
      titlePrefix: 'DBots',
      titleSuffix: 'Dashboard',
      description: 'Manage Discord bot listings, view logs and more with the DBots dashboard.',
      url: 'dashboard'
    });
  }
}
