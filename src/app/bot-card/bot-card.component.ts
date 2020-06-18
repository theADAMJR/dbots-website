import { Component, Input } from '@angular/core';
import { kebabToTitleCase } from '../utils';

@Component({
  selector: 'bot-card',
  templateUrl: './bot-card.component.html',
  styleUrls: ['./bot-card.component.css']
})
export class BotCardComponent {
  @Input() user = {
    id: '123',
    displayAvatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    presence: { status: 'ONLINE' },
    username: 'Username'
  }

  @Input() bot = {
    listing: {
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
      .map(t => kebabToTitleCase(t))
      .join(', ');
  }
}
