import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'member-username',
  templateUrl: './member-username.component.html',
  styleUrls: ['./member-username.component.css']
})
export class MemberUsernameComponent {
  @Input() user;
  @Input() withAvatar = true;

  constructor(public userService: UserService) {}
}
