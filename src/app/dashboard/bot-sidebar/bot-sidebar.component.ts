import { Component } from '@angular/core';

@Component({
  selector: 'bot-sidebar',
  templateUrl: './bot-sidebar.component.html',
  styleUrls: ['./bot-sidebar.component.css']
})
export class GuildSidebarComponent {
  constructor() {
      document.title = 'DBots - Dashboard';
    }
}
