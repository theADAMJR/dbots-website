import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BotsService } from '../services/bots.service';
import { TagService } from '../services/tag.service';
import { PackService } from '../services/pack.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnalyticsService } from '../services/analytics.service';
import marked from 'marked';

@Component({
  selector: 'bot-preview',
  templateUrl: './bot-preview.component.html',
  styleUrls: ['./bot-preview.component.css']
})
export class BotPreviewComponent implements OnInit {
  @Input() preview = false;
  @Input() ownerUser: any;

  @Input() bot = {
    approvedAt: null,
    badges: [],
    listing: {
      body: '',
      githubURL: 'https://github.com/theADAMJR',
      invite: '',
      overview: 'A good bot I guess...',
      prefix: '/',
      tags: ['music', 'moderation', 'utility'],
      websiteURL: 'https://3pg.xyz'
    },
    stats: { guildCount: 100 },
    ownerId: '218459216145285121',
    votes: ['218459216145285121']
  }

  @Input() user = {
    id: '',
    displayAvatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    username: 'Bot User',
    discriminator: '0000'
  }

  packForm = new FormGroup({
    name: new FormControl('', [ 
      Validators.required,
      Validators.pattern(/^([A-Za-z\d -])+$/),
    ])
  });

  get markdown() {
    return marked(this.bot.listing.body, { breaks: true })
      .replace(/<a/g, '<a rel="nofollow" target="_blank" ');
  }

  get canManage() {
    return this.userService.user?.id === this.bot.ownerId;
  }

  constructor(
    public analytics: AnalyticsService,
    public packs: PackService,
    public service: BotsService,
    private router: Router,
    public tagService: TagService,
    public userService: UserService) {}

  async ngOnInit() {
    await this.service.init();
    await this.packs.init();
    
    this.ownerUser = this.ownerUser
      ?? await this.userService.getUser(this.bot.ownerId);
  }

  async delete() {
    const shouldDelete = prompt(`Type 'DELETE' to confirm bot page deletion.`) === 'DELETE';
    if (!shouldDelete) return;

    await this.service.deleteBot(this.user.id);
    
    await this.service.refreshUserBots();    
    await this.service.refreshBots();    

    this.router.navigate(['/dashboard']);
  }

  async createPack(name: string) {    
    // if (this.packForm.invalid) return;
    await this.packs.create({ name, description: 'A pack of bots.' });
    await this.packs.refreshPacks();
  }

  async addToList(packId: string) {
    const pack = this.packs.get(packId);
    pack.bots.push(this.user.id);

    await this.packs.update(packId, pack);
  }
  async removeFromList(packId: string) {
    const pack = this.packs.get(packId);
    const index = pack.bots.findIndex(b => b._id === this.user.id);
    if (index >= 0)
      pack.bots.splice(index, 1);

    await this.packs.update(packId, pack);
  }

  inPack(pack: any) {
    return pack.bots.some(id => id === this.user.id);
  }
}
