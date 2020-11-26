import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css']
})
export class HomeFooterComponent {
  statusURL = 'https://dbots.statuspage.io';
  anchorVersion = environment.version.replace(/\./g, '');
  environment = environment;
}
