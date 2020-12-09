import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PackService } from 'src/app/services/pack.service';
import { SEOService } from 'src/app/services/seo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  savedUser: any;
  
  constructor(
    private packs: PackService,
    private route: ActivatedRoute,
    private seo: SEOService,
    private userService: UserService,
    private router: Router) {}

  async ngOnInit() {
    await this.packs.init();

    const id = this.route.snapshot.paramMap.get('id');
    this.user = await this.userService.getUser(id);
    this.savedUser = await this.userService.getSavedUser(id);

    if (!this.user || this.user?.bot)
      return this.router.navigate(['/']);

    this.seo.setTags({
      titlePrefix: this.user.username,
      description: `View ${this.user.username}'s bots and their public profile.`,
      url: `users/${this.user.id}`
    });

    document
      .querySelector('.navbar')
      .setAttribute('style', `
        background-color: var(--background-secondary) !important;
        margin-bottom: -5px;
      `);
  }
}
