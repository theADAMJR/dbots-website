import { Component, Input } from '@angular/core';
import marked from 'marked';

@Component({
  selector: 'bot-preview',
  templateUrl: './bot-preview.component.html',
  styleUrls: ['./bot-preview.component.css']
})
export class BotPreviewComponent {
  serverCount = 100;
  votes = 0;
  tags = ['music', 'moderation', 'utility'];
  @Input() body = '';

  @Input() user = {
    avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    username: 'Bot User',
    discriminator: '0000'
  }

  get markdown() {
    return marked(this.body, { breaks: true });
  }
}
