import { Component, OnInit } from '@angular/core';
import { BotsService } from 'src/app/bots/bots.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SEOService } from 'src/app/services/seo.service';
import { param } from 'jquery';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {
  bot: any;
  user: any;

  constructor(
    private botsService: BotsService,
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id')
      this.user = this.botsService.getBot(id);
      this.bot = this.botsService.getSavedBot(id);
  
      this.seo.setTags({
        description: `Overview of ${this.user.tag} bot listing.`,
        titlePrefix: this.user.tag,
        titleSuffix: 'Overview',
        url: `dashboard/bots/${this.user.id}`
      });
  
      if (!this.bot || !this.user)
        this.router.navigate(['/dashboard']);
    });
  }
}
