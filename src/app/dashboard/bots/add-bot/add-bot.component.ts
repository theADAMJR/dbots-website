import { Component, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toIterable } from 'src/app/utils';
import { BotsService } from 'src/app/services/bots.service';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { SEOService } from 'src/app/services/seo.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'add-bot',
  templateUrl: './add-bot.component.html',
  styleUrls: ['./add-bot.component.css']
})
export class AddBotComponent implements AfterViewInit {
  preview = false;

  toIterable = toIterable;
  filteredTags = this.tagService.tags;

  @Input() editing = false;

  form = new FormGroup({
    body: new FormControl('', [ Validators.required, Validators.minLength(300) ]),
    botId: new FormControl(''),
    githubURL: new FormControl('', [ Validators.pattern(/https:\/\/github\.com\//) ]),
    invite: new FormControl('', [ Validators.required, Validators.pattern(/https:\/\/discordapp.com|https:\/\/discord.com/) ]),
    overview: new FormControl('', [ Validators.required, Validators.minLength(32), Validators.maxLength(128) ]),
    ownerIds: new FormControl([], [ Validators.maxLength(3) ]),
    prefix: new FormControl('', [ Validators.required ]),
    supportInvite: new FormControl('', [ Validators.pattern(/^[A-Za-z0-9]{7}$/) ]),
    websiteURL: new FormControl('', [ Validators.pattern(/http/) ]),
    tags: new FormControl([], [ Validators.maxLength(8) ])
  });

  @Input() user = {
    id: '',
    displayAvatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    presence: { status: 'ONLINE' },
    tag: 'New Bot#0001',
    username: 'New Bot'
  }

  @Input() bot = {
    listing: {
      body: `Add something \`meaningful\` and **useful** here, to help your bot users.`,
      overview: 'Add bot summary here.'
    },
    guildCount: 100,
    votes: toIterable(100)
  };
  
  get widgetURL() { return `${environment.url}/api/v1/bots/525935335918665760/widget`; }

  constructor(
    public botService: BotsService,
    private router: Router,
    seo: SEOService,
    public tagService: TagService,
    private userService: UserService) {
      seo.setTags({
        description: 'Add a bot to the bot list with this form.',
        titlePrefix: 'Add Bot',
        titleSuffix: 'Dashboard',
        url: 'dashboard/bots/new'
      });
    }

  ngAfterViewInit() {
    setTimeout(async () => {
      await this.botService.init();

      if (!this.editing)
        this.initDraft();    

      this.form.get('botId').setValidators([
        Validators.required, 
        Validators.pattern(/^\d{18}$/),
        Validators.pattern(new RegExp(`^(?!${this.userService.user.id}).*$`))
      ]);
    });
  }

  private initDraft() {
    for (const key in this.bot.listing)
      this.form.controls[key]
        ?.setValue(this.bot.listing[key]);

    const draft = localStorage.getItem('botListingDraft');
    
    if (!this.editing && draft)
      this.form.setValue(JSON.parse(draft));

    this.form.valueChanges
      .subscribe(() => this.updateDraft());
  }

  private updateDraft() {
    localStorage.setItem('botListingDraft', JSON.stringify(this.form.value));   
    this.bot.listing = this.form.value; 
  }
  
  filterTags(filter: string): void {
    this.filteredTags = this.tagService.tags
      .filter(tag => tag.name
        .toLowerCase()
        .includes(filter.toLowerCase()));
  }

  submit() {
    if (this.form.invalid)
      return this.form.setErrors({ invalid: true });
    
    this.botService.createBot(this.form.value);
  }
  update() {
    if (this.form.invalid)
      return this.form.setErrors({ invalid: true });
    
    this.botService.updateBot(this.form.value.botId, this.form.value);
  }

  navigateToBotListing() {
    this.router.navigate(['/bots/', this.form.value.botId]);
  }

  // input events

  add(event: MatChipInputEvent, array: any[]) {        
    const { value, input } = event;

    if ((value || '').trim())
      array.push(value.trim());

    if (input) 
      input.value = '';
  }
  
  remove(item: any, array: any[]) {
    const index = array.indexOf(item);
    if (index >= 0)
      array.splice(index, 1);
  }
}

export class Listing {
  body: string;
  botId: string;
  invite: string;
  clientId: string;
  githubURL: string;
  overview: string;
  ownerIds: string[];
  prefix: string;
  supportInvite: string; 
  tags: string;
  websiteURL: string;
}