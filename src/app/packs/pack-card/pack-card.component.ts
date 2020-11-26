import { Component, Input, OnInit } from '@angular/core';
import { BotsService } from 'src/app/services/bots.service';

@Component({
  selector: 'pack-card',
  templateUrl: './pack-card.component.html',
  styleUrls: ['./pack-card.component.css']
})
export class PackCardComponent {
  @Input() pack: any;

  // FIXME: will break with lazy loading
  get botUsers() {
    return this.botsService.bots
      .filter(b => this.pack?.bots.includes(b.id))
      .slice(0, 5);
  }

  constructor(private botsService: BotsService) {}
}
