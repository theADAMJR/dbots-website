import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent {
  get user() { return this.userService.user ?? {}; }

  constructor(private userService: UserService) {
    document.title = 'DBots - Dashboard';
  }
}
