import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { BotsService } from './services/bots.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private botService: BotsService,
    private userService: UserService) {}

  async ngOnInit() {
    await this.botService.init();

    this.auth.validateKey();

    await this.userService.updateUser();
    await this.userService.updateSavedUser();
  } 
}
