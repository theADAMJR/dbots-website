import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { SEOService } from './services/seo.service';
import { BotsService } from './services/bots.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private botService: BotsService,
    private userService: UserService) {}

  async ngOnInit() {
    await this.botService.init();

    await this.userService.updateUser();
    await this.userService.updateSavedUser();
  } 
}
