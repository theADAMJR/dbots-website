import { Component, OnInit } from '@angular/core';
import { BotTokenService } from 'src/app/services/bot-token.service';
import { ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/services/bots.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class APIComponent implements OnInit {
  bot: any;
  user: any;
  hidden = true;
  token = '';

  form = new FormGroup({
    voteWebhookURL: new FormControl('https://')
  });

  get id() { return this.route.snapshot.paramMap.get('id'); }

  constructor(
    private botService: BotsService,
    private tokens: BotTokenService,
    private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.botService.init();

    this.bot = this.botService.getSavedBot(this.id);
    this.user = this.botService.getBot(this.id);
    this.token = await this.tokens.getToken(this.id);
  }

  async regen() {
    this.token = await this.tokens.regenToken(this.id);
  }

  toggleHidden() {
    this.hidden = !this.hidden;
  }
  async regenerate() {
    this.token = await this.tokens.regenToken(this.id);
  }
  async copyToken() {
    await navigator.clipboard.writeText(this.token);    
  }
}
