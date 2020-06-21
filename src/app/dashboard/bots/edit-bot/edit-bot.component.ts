import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/services/bots.service';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-edit-bot',
  templateUrl: './edit-bot.component.html',
  styleUrls: ['./edit-bot.component.css']
})
export class EditBotComponent implements OnInit {
  bot: any;
  user: any;

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
        description: 'Add a bot to the bot list with this form.',
        titlePrefix: this.user.tag,
        titleSuffix: 'Dashboard',
        url: `dashboard/bots/${this.id}`
      });
    }
}
