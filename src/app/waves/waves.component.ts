import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'waves',
  templateUrl: './waves.component.html',
  styleUrls: ['./waves.component.css']
})
export class WavesComponent implements OnInit {
  @Input() inverted = false;
  @Input() set color(value: string) {
    document.documentElement.style.setProperty('--waves', value);
  }

  ngOnInit() {
    this.color = 'var(--background-secondary)';  
  }
}
