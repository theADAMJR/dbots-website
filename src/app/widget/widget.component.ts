import { Component, Input, AfterViewInit } from '@angular/core';
import { BotsService } from '../services/bots.service';

@Component({
  selector: 'dbots-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements AfterViewInit {
  @Input('bot-id') botId = '';
  @Input() size = 'large';

  user: any;
  bot: any;

  constructor(private service: BotsService) {}

  async ngAfterViewInit() {
    await this.service.init();
    
    this.user = this.service.getBot(this.botId);
    this.bot = this.service.getSavedBot(this.botId);
  }
}
