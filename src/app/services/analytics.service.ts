import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BotsService } from './bots.service';
import { LogService } from './log.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(
    private log: LogService,
    public socket: Socket,
    private botsService: BotsService) {}

  async connect() {
    await this.botsService.init();

    this.log.info('EMIT READY', 'any');
    this.socket.emit('READY', {
      botIds: this.botsService.userBots.map(b => b.id)
    });
  }

  botImpression(data: { botId: string }) {
    this.log.info('EMIT BOT_IMPRESSION', 'any');
    this.socket.emit('BOT_IMPRESSION', data);
  }

  botInvite(data: { botId: string }) {
    this.log.info('EMIT BOT_INVITE', 'any');
    this.socket.emit('BOT_INVITE', data);
  }

  botPageView(data: { botId: string }) {
    this.log.info('EMIT BOT_PAGE_VIEW', 'any');
    this.socket.emit('BOT_PAGE_VIEW', data);
  }
}
