import { Component, Input } from '@angular/core';

@Component({
  selector: 'waves',
  templateUrl: './waves.component.html',
  styleUrls: ['./waves.component.css']
})
export class WavesComponent {
  uuid = 'wave' + (Math.floor(Math.random() * 9e5)).toString().padStart(9, '0');

  @Input() inverted = false;
  @Input() set color(value: string) {
    setTimeout(() => {
      document
        .querySelectorAll(`#${this.uuid} use`)
        .forEach(el => el.setAttribute('style', `fill: ${value}`));      
    });    
  }

  constructor() {
    this.color = 'var(--background-secondary)';
  }
}
