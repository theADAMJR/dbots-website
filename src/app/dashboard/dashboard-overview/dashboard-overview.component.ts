import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SEOService } from 'src/app/services/seo.service';
import { BotsService } from 'src/app/bots/bots.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardComponent implements OnInit {
  unreviewedSavedBots = [];

  constructor(
    public botService: BotsService,
    private seo: SEOService,
    public userService: UserService) {
  }

  async ngOnInit() {
    this.seo.setTags({
      titlePrefix: 'DBots',
      titleSuffix: 'Dashboard',
      description: 'Manage Discord bot listings, view logs and more with the DBots dashboard.',
      url: 'dashboard'
    });

    await this.botService.init();

    this.unreviewedSavedBots = this.botService.unreviewedBots.saved;
  }
}
