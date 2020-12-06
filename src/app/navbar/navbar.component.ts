import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import { BotsService } from '../services/bots.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  get discordInvite() { return environment.discordInvite; }
  get githubURL() { return environment.githubURL; }
  get user() { return this.userService.user; }
  
  randomBotId = '';

  constructor(
    private userService: UserService,
    private botsService: BotsService,
  ) {}

  async ngOnInit() {
    await this.botsService.init();
    this.updateRandomBotId();
  }

  updateRandomBotId() {
    this.randomBotId = this.botsService.getRandomBot()?.id;
  }
}
