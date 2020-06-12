import { Component, OnInit } from '@angular/core';
import { BotsService } from 'src/app/bots/bots.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {
  bot: any;

  constructor(
    private botsService: BotsService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bot = this.botsService.savedBots.find(b => b.id === id);
  }
}
