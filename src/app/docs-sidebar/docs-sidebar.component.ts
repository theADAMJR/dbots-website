import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'docs-sidebar',
  templateUrl: './docs-sidebar.component.html',
  styleUrls: ['./docs-sidebar.component.css']
})
export class DocsSidebarComponent {
  @Output() search = new EventEmitter();
  @ViewChild('drawer') drawer: MatDrawer;

  environment = environment;

  toggle() {
    const icon = document.querySelector('#nav-icon1');
    icon.classList.toggle('open');
    this.drawer.toggle();
  }

  emitSearch(query: string) {
    this.search.emit({ query });
  }
}
