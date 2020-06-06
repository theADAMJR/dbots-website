import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css']
})
export class HomeFooterComponent {
  title = 'Template Wizard';
  subtitle = 'Buy or Sell Website Templates';
  version = environment.version;
}
