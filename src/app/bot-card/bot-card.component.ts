import { Component, Input, AfterViewInit } from '@angular/core';
import { kebabToTitleCase } from '../utils';

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
      .join(', ');
  }

  ngAfterViewInit() {


    console.log(this.user);    
  }
}
