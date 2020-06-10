import { Component, Input } from '@angular/core';
import marked from 'marked';

@Component({
  selector: 'bot-preview',
  templateUrl: './bot-preview.component.html',
  styleUrls: ['./bot-preview.component.css']
})
export class BotPreviewComponent {  
  @Input() bot = {
    listing: {
      body: '',
      prefix: '/',
      tags: ['music', 'moderation', 'utility']
    },
    guildCount: 100,
    votes: ['218459216145285121']
  }

  @Input() user = {
    avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    username: 'Bot User',
    discriminator: '0000'
  }

  get markdown() {
    return marked(this.bot.listing.body, { breaks: true });
  }
}
