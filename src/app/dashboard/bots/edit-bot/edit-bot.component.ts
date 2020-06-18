import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/bots/bots.service';

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
    private service: BotsService) {}

    async ngOnInit() {
      await this.service.init();
      
      this.bot = this.service.getSavedBot(this.id);
      this.user = this.service.getBot(this.id);
    }
}
