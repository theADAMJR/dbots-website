import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import { BotsService } from '../services/bots.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  get discordInvite() { return environment.discordInvite; }
  get githubURL() { return environment.githubURL; }
  get user() { return this.userService.user; }

  constructor(
    private userService: UserService,
    private botsService: BotsService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.botsService.init();
  }

  randomBot() {
    const randomId = this.botsService.getRandomBot()?.id;
    this.router.navigate(['/bots/', randomId]);
  }
}
