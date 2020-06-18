import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { BotsService } from '../bots/bots.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-bot-vote',
  templateUrl: './bot-vote.component.html',
  styleUrls: ['./bot-vote.component.css']
})
export class BotVoteComponent implements OnInit {
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
      titleSuffix: this.user.username,
      url: `bots/${this.id}`
    });
  }

  async vote() {
    if (!this.userService.user) return;

    await this.service.vote(this.id);
    await this.service.updateBots();

    return this.router.navigate(['/bots/' + this.id]);
  }
}
