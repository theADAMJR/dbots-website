import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { BotsService } from 'src/app/services/bots.service';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  bot: any;
  log: any;
  user: any;
  stats: any;

  get id() { 
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(
    private route: ActivatedRoute,
    private botsService: BotsService,
    private service: AnalyticsService,
    private seo: SEOService) {}

  async ngOnInit() {
    await this.botsService.init();

    this.bot = this.botsService.getSavedBot(this.id);
    this.user = this.botsService.getBot(this.id);
    this.stats = await this.botsService.getStats(this.id);
    this.log = await this.botsService.getSavedLog(this.id);
    
    this.seo.setTags({
      description: '',
      titlePrefix: this.user.tag,
      titleSuffix: 'Widget',
      url: `dashboard/bots/${this.id}`
    });

    this.hookWSEvents();
    await this.service.connect();
  }

  private hookWSEvents() {
    this.service.socket.on('BOT_IMPRESSION', async ({ log }) => {
      if (log._id !== this.user.id) return;

      this.log = log;
    });
    this.service.socket.on('BOT_PAGE_VIEW', async ({ log }) => {
      if (log._id !== this.user.id) return;

      this.log = log;
    });
    this.service.socket.on('BOT_INVITE', async ({ log }) => {
      if (log._id !== this.user.id) return;

      this.log = log;
    });
  }

  last(arr: any[]) {
    return arr[arr.length - 1];
  }
}
