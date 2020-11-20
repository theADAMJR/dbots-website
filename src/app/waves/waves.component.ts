import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'waves',
  templateUrl: './waves.component.html',
  styleUrls: ['./waves.component.css']
})
export class WavesComponent {
  @Input() inverted = false;
  @Input() set color(value: string) {
    document.documentElement.style.setProperty('--waves', value);
  }
  
  constructor() {
    this.color = 'var(--background-secondary)';  
  }
}
