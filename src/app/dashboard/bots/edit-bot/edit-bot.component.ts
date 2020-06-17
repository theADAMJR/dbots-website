import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/bots/bots.service';

@Component({
  selector: 'app-edit-bot',
  templateUrl: './edit-bot.component.html',
  styleUrls: ['./edit-bot.component.css']
})
export class EditBotComponent {
  get savedBot() { return this.service.getSavedBot(this.id) }
  get bot() { return this.service.getBot(this.id) }

  get id() { return this.route.snapshot.paramMap.get('id') }

  constructor(
    private route: ActivatedRoute,
    private service: BotsService) {}
}
