import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private seo: SeoService,
    private userService: UserService) {}

  async ngOnInit() {
    await this.userService.updateUser();
    await this.userService.updateSavedUser();

    this.seo.setTags({
      description: 'Find the best Discord bots easily and quickly for your servers.',
      titleSuffix: 'Discord Bot',
      url: '/'
    });
  } 
}
