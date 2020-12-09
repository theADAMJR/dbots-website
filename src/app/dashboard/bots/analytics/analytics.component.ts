import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { BotsService } from 'src/app/services/bots.service';
import { SEOService } from 'src/app/services/seo.service';
import { UserService } from 'src/app/services/user.service';
import { GraphComponent } from '../../analytics/graph/graph.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  bot: any;
  user: any;
  stats: any;
  log: any;

  private _days = 7;
  get days() {
    return this._days;
  }
  set days(value: number) {
    this._days = value;
    this.updateCharts();
  }

  @ViewChild('chart1') chart1: GraphComponent;
  @ViewChild('chart2') chart2: GraphComponent;
  @ViewChild('chart3') chart3: GraphComponent;
  @ViewChild('chart4') chart4: GraphComponent;

  set newLog(value: any) {
    this.log = value;
    this.updateCharts();
  }

  get id() { 
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(
    private route: ActivatedRoute,
    private botsService: BotsService,
    private userService: UserService,
    private service: AnalyticsService,
    private seo: SEOService) {}

  async ngOnInit() {
    await this.botsService.init();

    this.bot = this.botsService.getSavedBot(this.id);
    this.user = await this.userService.getUser(this.id);
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

      this.newLog = log;
    });
    this.service.socket.on('BOT_PAGE_VIEW', async ({ log }) => {
      if (log._id !== this.user.id) return;

      this.newLog = log;
    });
    this.service.socket.on('BOT_INVITE', async ({ log }) => {
      if (log._id !== this.user.id) return;

      this.newLog = log;
    });
  }

  private updateCharts() {    
    this.chart1.updateCharts(this._days);
    this.chart2.updateCharts(this._days);
    this.chart3.updateCharts(this._days);
    this.chart4.updateCharts(this._days);
  }

  last(arr: any[]) {
    return arr[arr.length - 1];
  }
}
