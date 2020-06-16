import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDrawer } from '@angular/material/sidenav';
import { BotsService } from 'src/app/bots/bots.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  constructor(
    public botService: BotsService,
    public userService: UserService) {}

  async ngOnInit() {
    await this.botService.init();
  }

  toggle(el: HTMLElement) {
    const icon = (el.tagName !== 'DIV') ? el.parentElement : el;
    icon.classList.toggle('open');
    this.drawer.toggle();
  }
}
