import { Component, Input } from '@angular/core';

@Component({
  selector: 'bot-card',
  templateUrl: './bot-card.component.html',
  styleUrls: ['./bot-card.component.css']
})
export class BotCardComponent {
  @Input() user = {
    avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    username: 'Username',
    presence: 'ONLINE'
  }

  @Input() bot = {
    guildCount: 10,
    listing: {
      overview: 'A good bot I guess...',
      tags: ['Economy', 'Moderation']
    },
    votes: ['218459216145285121'],
  }
}
