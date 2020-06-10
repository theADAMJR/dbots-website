import { Component, ViewChild, ElementRef } from '@angular/core';
import { BotsComponent } from '../bots/bots.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() {
    document.title = 'DBots - Find Discord Bots';
  }
}
