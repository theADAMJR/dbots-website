import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackService } from 'src/app/services/pack.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pack-vote',
  templateUrl: './pack-vote.component.html',
  styleUrls: ['./pack-vote.component.css']
})
export class PackVoteComponent implements OnInit {
  pack: any;

  get packId() {
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(
    private route: ActivatedRoute,
    private packs: PackService,
    private router: Router,
    public userService: UserService,
  ) {}

  async ngOnInit() {
    await this.packs.init();

    this.pack = await this.packs.get(this.packId);
    if (!this.pack)
      return this.router.navigate(['/']);
  }

  

  async vote() {
    if (!this.userService.user) return;

    try {
      await this.packs.vote(this.packId);
    } catch (error) {
      alert(error?.error?.message);
    }
    await this.packs.refreshPacks();

    return this.router.navigate(['/packs/' + this.packId]);
  }
}
