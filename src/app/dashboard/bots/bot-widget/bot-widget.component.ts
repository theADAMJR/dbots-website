import { Component, Input } from '@angular/core';

@Component({
  selector: 'bot-widget',
  templateUrl: './bot-widget.component.html',
  styleUrls: ['./bot-widget.component.css']
})
export class BotWidgetComponent {
  @Input() size: WidgetSize = 'md';

  @Input() bot = {
    guildCount: 10,
    listing: {
      overview: 'A good bot I guess...',
      tags: ['Economy', 'Moderation']
    },
    votes: ['218459216145285121']
  }
}

export type WidgetSize = 'lg' | 'md' | 'sm';