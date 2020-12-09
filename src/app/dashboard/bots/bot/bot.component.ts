import { Component, OnInit } from '@angular/core';
import { BotsService } from 'src/app/services/bots.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SEOService } from 'src/app/services/seo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {
  bot: any;
  user: any;
  stats: any;

  constructor(
    private botsService: BotsService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private seo: SEOService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap) => {
      const id = paramMap.get('id');      
       
      this.bot = await this.botsService.getSavedBot(id);
      this.stats = await this.botsService.getStats(id);
      this.user = await this.userService.getUser(id);

      this.seo.setTags({
        description: `Overview of ${this.user.tag} bot listing.`,
        titlePrefix: this.user.tag,
        titleSuffix: 'Overview',
        url: `dashboard/bots/${this.user.id}`
      });
  
      if (!this.bot || !this.user)
        return this.router.navigate(['/dashboard']);
    });
  }
}
