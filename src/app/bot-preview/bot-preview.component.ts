import { Component, Input, AfterContentInit } from '@angular/core';
import marked from 'marked';
import { UserService } from '../services/user.service';
import { BotsService } from '../bots/bots.service';

@Component({
  selector: 'bot-preview',
  templateUrl: './bot-preview.component.html',
  styleUrls: ['./bot-preview.component.css']
})
export class BotPreviewComponent {  
  @Input() bot = {
    approvedAt: null,
    listing: {
      body: '',
      githubURL: 'https://github.com/theADAMJR',
      overview: 'A good bot I guess...',
      prefix: '/',
      tags: ['music', 'moderation', 'utility'],
      websiteURL: 'https://3pg.xyz'
    },
    guildCount: 100,
    ownerId: '218459216145285121',
    votes: ['218459216145285121']
  }

  @Input() user = {
    id: '',
    displayAvatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    username: 'Bot User',
    discriminator: '0000'
  }

  get markdown() {
    return marked(this.bot.listing.body, { breaks: true })
      .replace(/<a/g, '<a rel="nofollow" target="_blank" ');
  }

  get canManage() {
    return this.userService.user?.id === this.bot.ownerId;
  }

  constructor(
    public service: BotsService,
    private userService: UserService) {}
}
