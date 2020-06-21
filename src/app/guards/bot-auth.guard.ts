import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BotsService } from '../services/bots.service';

@Injectable({
  providedIn: 'root'
})
export class BotAuthGuard implements CanActivate {
  constructor(private service: BotsService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    await this.service.init();
    return true;
  }  
}
