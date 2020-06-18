import { Component, Input } from '@angular/core';

@Component({
  selector: 'bot-sidebar',
  templateUrl: './bot-sidebar.component.html',
  styleUrls: ['./bot-sidebar.component.css']
})
export class BotSidebarComponent {
  @Input() loaded = true;
  @Input() user = {
    id: '',
    displayAvatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    username: 'New Bot'
  };
}
