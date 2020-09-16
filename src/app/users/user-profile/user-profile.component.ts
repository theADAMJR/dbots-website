import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SEOService } from 'src/app/services/seo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  
  constructor(
    private route: ActivatedRoute,
    private seo: SEOService,
    private userService: UserService,
    private router: Router) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = await this.userService.getUser(id);
    if (!this.user || this.user?.bot)
      this.router.navigate(['/']);

    this.seo.setTags({
      titlePrefix: this.user.username,
      description: `View ${this.user.username}'s bots and their public profile.`,
      url: `users/${this.user.id}`
    });
  }
}
