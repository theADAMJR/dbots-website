import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/services/bots.service';
import { PackService } from 'src/app/services/pack.service';
import { SEOService } from 'src/app/services/seo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit {
  pack: any;
  ownerUser: any;

  get packId() {
    return this.route.snapshot.paramMap.get('id');
  }
  
  constructor(
    private bots: BotsService,
    private packs: PackService,
    private route: ActivatedRoute,
    private seo: SEOService,
    public userService: UserService,
    private router: Router) {}

  async ngOnInit() {
    await this.packs.init();
    await this.bots.init();

    this.pack = await this.packs.fetch(this.packId);
    if (!this.pack)
      return this.router.navigate(['/']);

    this.ownerUser = await this.userService.getUser(this.pack.owner._id ?? this.pack.owner);

    this.seo.setTags({
      titlePrefix: this.pack.name,
      description: `View the ${this.pack.name}' Bot Pack with ${this.pack.votes.length} votes, and ${this.pack.bots.length} bots.`,
      url: `packs/${this.packId}`
    });

    document
      .querySelector('.navbar')
      .setAttribute('style', `
        background-color: var(--background-secondary) !important;
        margin-bottom: -5px;
      `);
  }

  async delete() {
    const shouldDelete = prompt(`Type 'DELETE' to confirm bot page deletion.`) === 'DELETE';
    if (!shouldDelete) return;

    await this.packs.delete(this.pack._id);
    await this.packs.refreshPacks();    

    this.router.navigate(['/']);
  }
}
