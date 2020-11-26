import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { BotsService } from './services/bots.service';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { PackService } from './services/pack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private botService: BotsService,
    private packService: PackService,
    private themeService: ThemeService,
    private userService: UserService) {}

  async ngOnInit() {
    this.themeService.updateTheme();
    await this.botService.init();
    await this.packService.init();

    this.auth.validateKey();

    await this.userService.init();
  } 
}
