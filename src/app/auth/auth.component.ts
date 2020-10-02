import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BotsService } from '../services/bots.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private botsService: BotsService,
    private userService: UserService) {}

  async ngOnInit() {
    try {
      const key = this.route.snapshot.queryParamMap.get('key');
      localStorage.setItem('key', key);
    
      await this.userService.updateUser();
      await this.botsService.refreshUserBots();
      
      this.router.navigate(['/dashboard']);
    } catch {
      this.router.navigate(['/']);
    }
  }
}