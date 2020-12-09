import { Component, Input, AfterViewInit } from '@angular/core';
import { kebabToTitleCase } from '../utils';
import { AnalyticsService } from '../services/analytics.service';
import { BotsService } from '../services/bots.service';

@Component({
  selector: 'bot-card',
  templateUrl: './bot-card.component.html',
  styleUrls: ['./bot-card.component.css']
})
export class BotCardComponent implements AfterViewInit {
  @Input() user = {
    id: '',
    displayAvatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    presence: { status: 'online' },
    username: 'Username'
  }

  @Input() bot = {
    listing: {
      invite: '',
      overview: 'A good bot I guess...',
      tags: ['Economy', 'Moderation']
    },
    stats: {
      guildCount: 10,
    },
    votes: ['218459216145285121']
  }

  get cleanTags() {
    return this.bot.listing.tags
      ?.map(t => kebabToTitleCase(t))
      .slice(0, 3)
      .join(', ');
  }

  constructor(
    private analytics: AnalyticsService,
    private botsService: BotsService) {}

  async ngAfterViewInit() {
    await this.botsService.init();

    if (this.user)
      this.analytics.botImpression({ botId: this.user.id });
  }
}
