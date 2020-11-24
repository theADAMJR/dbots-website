import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ThemeService } from 'src/app/services/theme.service';
import { MatSelect } from '@angular/material/select';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit {
  @ViewChild('themeSelect') themeSelect: MatSelect;

  defaultTheme = 'NEXT_GEN';

  form = new FormGroup({
    theme: new FormControl(localStorage.getItem('theme') ?? this.defaultTheme)
  });
  
  get user() { return this.userService.user ?? {}; }

  constructor(
    private service: ThemeService,
    private userService: UserService) {
    document.title = 'DBots - Dashboard';
  }
  ngOnInit() {
    this.service.updateTheme();
    this.form.valueChanges.subscribe(() => 
      this.service.changeTheme(
        this.form.get('theme').value));
  }
}
