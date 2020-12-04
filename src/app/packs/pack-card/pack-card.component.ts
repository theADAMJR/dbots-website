import { Component, Input, OnInit } from '@angular/core';
import { BotsService } from 'src/app/services/bots.service';

@Component({
  selector: 'pack-card',
  templateUrl: './pack-card.component.html',
  styleUrls: ['./pack-card.component.css']
})
export class PackCardComponent {
  @Input() pack: any;

  private randomColors = [
    '#A52A2A',
    '#6495ED',
    '#DEB887',
    '#008B8B',
    '#B8860B',
    '#8B008B'
  ];
  randomColor: any;

  // FIXME: will break with lazy loading
  get botUsers() {
    return this.botsService.bots
      .filter(b => this.pack?.bots.includes(b.id))
      .slice(0, 5);
  }

  constructor(private botsService: BotsService) {
    const index = Math.floor(Math.max(0, Math.random() * (this.randomColors.length - 1)));    
    this.randomColor = this.randomColors[index];
  }
}
