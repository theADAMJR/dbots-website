import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDrawer } from '@angular/material/sidenav';
import { BotsService } from 'src/app/services/bots.service';

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

  toggle() {
    const icon = document.querySelector('#nav-icon1');
    icon.classList.toggle('open');
    this.drawer.toggle();
  }
}
