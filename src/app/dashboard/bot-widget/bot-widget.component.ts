import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/services/bots.service';
import { SEOService } from 'src/app/services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bot-widget',
  templateUrl: './bot-widget.component.html',
  styleUrls: ['./bot-widget.component.css']
})
export class BotWidgetComponent implements OnInit {
  bot: any;
  user: any;

  get widgetURL() { return `${environment.endpoint}/bots/${this.id}/widget`; }
  get id() { return this.route.snapshot.paramMap.get('id') }

  constructor(
    private route: ActivatedRoute,
    private service: BotsService,
    private seo: SEOService) {}

    async ngOnInit() {
      await this.service.init();
      
      this.bot = this.service.getSavedBot(this.id);
      this.user = this.service.getBot(this.id);
      
      this.seo.setTags({
        description: '',
        titlePrefix: this.user.tag,
        titleSuffix: 'Dashboard',
        url: `dashboard/bots/${this.id}`
      });
    }
}