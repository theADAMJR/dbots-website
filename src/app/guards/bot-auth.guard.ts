import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BotsService } from '../services/bots.service';

@Injectable({ providedIn: 'root' })
export class BotAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: BotsService) {}

  async canActivate(next: ActivatedRouteSnapshot) {
    await this.service.init();

    const id = next.paramMap.get('id');
    const ownsBot = this.service.userBots.some(b => b.id === id);
    if (!ownsBot)
      await this.router.navigate(['/dashboard']);

    return true;
  }  
}
