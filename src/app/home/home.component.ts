import { Component } from '@angular/core';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(seo: SEOService) {
    seo.setTags({
      titleSuffix: 'DBots',
      titlePrefix: 'Best Discord Bots',
      description: 'Find the best bots to add to your servers. We have many different bots including music bots, moderation bots, chat bots and more.',
      url: '/'
    });
  }
}
