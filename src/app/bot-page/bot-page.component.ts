import { Component, OnInit } from '@angular/core';
import { BotsService } from '../services/bots.service';
import { SEOService } from '../services/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';
import { AnalyticsService } from '../services/analytics.service';
import { param } from 'jquery';

@Component({
  selector: 'app-bot-page',
  templateUrl: './bot-page.component.html',
  styleUrls: ['./bot-page.component.css']
})
export class BotPageComponent implements OnInit {
  bot: any;
  user: any;
  ownerUser: any;
  id: string;

  constructor(
    private analytics: AnalyticsService,
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService,
    private service: BotsService,
    public userService: UserService,
    private themeService: ThemeService) {}

  async ngOnInit() {
    await this.service.init();

    this.route.paramMap.subscribe(async(paramMap) => {
      this.id = paramMap.get('id');

      this.user = await this.userService.getUser(this.id);
      this.bot = this.service.getSavedBot(this.id);
      this.ownerUser = await this.userService.getUser(this.bot.ownerId);
      if (!this.user || !this.bot)
        return this.router.navigate(['/']);
  
      this.seo.setTags({
        description: this.bot.listing.overview,
        titlePrefix: this.user.username,
        titleSuffix: 'DBots',
        url: `bots/${this.id}`
      });
  
      this.analytics.botPageView({ botId: this.user.id });
    });
    
    this.themeService.setNavbarBackground('var(--background-secondary)');
    document
      .querySelector('.navbar')
      .setAttribute('style', `margin-bottom: -5px;`);
  }
}
