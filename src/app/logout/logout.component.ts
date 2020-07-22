import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService) {}

  async ngOnInit() {
    localStorage.removeItem('key');
    
    await this.userService.updateUser();
    await this.userService.updateSavedUser();

    this.router.navigate(['/']);
  }
}
