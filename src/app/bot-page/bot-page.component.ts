import { Component, OnInit } from '@angular/core';
import { BotsService } from '../services/bots.service';
import { SEOService } from '../services/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-bot-page',
  templateUrl: './bot-page.component.html',
  styleUrls: ['./bot-page.component.css']
})
export class BotPageComponent implements OnInit {
  bot: any;
  user: any;

  get id() { return this.route.snapshot.paramMap.get('id') }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService,
    private service: BotsService,
    public userService: UserService) {}

  async ngOnInit() {
    await this.service.init();

    this.user = this.service.getBot(this.id);
    this.bot = this.service.getSavedBot(this.id);
    if (!this.user || !this.bot)
      return this.router.navigate(['']);

    this.seo.setTags({
      description: this.bot.listing.overview,
      titlePrefix: this.user.username,
      titleSuffix: 'DBots',
      url: `bots/${this.id}`
    });
  }

  async approve(reason: string) {        
    if (reason.length < 50) return;

    await this.service.approveBot(this.id, reason);

    this.router.navigate(['/bots/' + this.id]);
  }
  async decline(reason: string) {
    if (reason.length < 50) return;

    await this.service.declineBot(this.id, reason);

    this.router.navigate(['/bots/' + this.id]);
  }
}
