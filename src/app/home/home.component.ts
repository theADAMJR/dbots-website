import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  placeholder: string;

  tags = [
    'music',
    'moderation',
    'social',
    'util'
  ];

  constructor() {
    document.title = 'DBots - Find Discord Bots';
    this.placeholder = this.getRandomPlaceholder();
  }

  getRandomPlaceholder() {
    const i = Math.floor(Math.random() * (this.tags.length - 1));
    return this.tags[i];
  }
}
