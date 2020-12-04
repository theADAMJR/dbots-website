import { Component, AfterViewInit, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toIterable } from 'src/app/utils';
import { BotsService } from 'src/app/services/bots.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { SEOService } from 'src/app/services/seo.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { MatCheckbox } from '@angular/material/checkbox';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'add-bot',
  templateUrl: './add-bot.component.html',
  styleUrls: ['./add-bot.component.css']
})
export class AddBotComponent implements OnInit, AfterViewInit {
  @ViewChild('confirmInput') confirmInput: MatCheckbox;
  @Input() editing = false;

  preview = false;
  
  apiError = '';
  toIterable = toIterable;
  filteredTags = this.tagService.tags;
  environment = environment;

  form = new FormGroup({
    body: new FormControl('', [ Validators.required, Validators.minLength(300) ]),
    botId: new FormControl(''),
    githubURL: new FormControl('', [ Validators.pattern(/https:\/\/github\.com\//) ]),
    invite: new FormControl('', [ Validators.required, Validators.pattern(/https:\/\/discordapp.com|https:\/\/discord.com/) ]),
    overview: new FormControl('', [ Validators.required, Validators.minLength(32), Validators.maxLength(128) ]),
    ownerIds: new FormControl([], [ Validators.maxLength(3) ]),
    prefix: new FormControl('', [ Validators.required ]),
    supportInvite: new FormControl('', [ Validators.pattern(/^[A-Za-z\d]{7,10}$/) ]),
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
    listing: this.form.value,
    guildCount: 100,
    votes: toIterable(100)
  };

  get canSubmit() {
    return this.form.valid && this.confirmInput.checked;
  }  
  get widgetURL() {
    return `${environment.url}/api/v1/bots/${this.user?.id || '525935335918665760'}/widget`;
  }

  constructor(
    private route: ActivatedRoute,
    public botService: BotsService,
    private router: Router,
    seo: SEOService,
    public tagService: TagService,
    public userService: UserService,
    private themeService: ThemeService) {
      seo.setTags({
        description: 'Add a bot to the bot list with this form.',
        titlePrefix: 'Add Bot',
        titleSuffix: 'Dashboard',
        url: 'dashboard/bots/new'
      });
    }

  async ngOnInit() {
    await this.userService.init();
    await this.botService.init();
    
    this.initNavbarToggle();
    this.themeService.setNavbarBackground('transparent');
  }

  private initNavbarToggle() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const previewButton = document.querySelector('#previewButton') as HTMLButtonElement;
    const stopPreviewButton = document.querySelector('#stopPreviewButton') as HTMLButtonElement;

    if (previewButton)
      previewButton.onclick = () => navbar.style.backgroundColor = 'var(--background-secondary) !important';
    if (stopPreviewButton)
      stopPreviewButton.onclick = () => navbar.style.backgroundColor = 'transparent';
  }

  ngAfterViewInit() {
    setTimeout(async () => {
      if (!this.editing)
        this.initDraft();
      else {
        const botId = this.route.snapshot.paramMap.get('id');
        const savedBot = this.botService.getSavedBot(botId);

        this.form.setValue(savedBot.listing);
      }

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
    
    if (draft)
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

  async submit() {    
    if (!this.canSubmit)
      return this.form.setErrors({ invalid: true });

    try {
      this.apiError = '';
      await this.botService.createBot(this.form.value);
    } catch (error) {
      this.apiError = error.error?.message;
    }
  }
  async update() {
    if (this.form.invalid)
      return this.form.setErrors({ invalid: true });
    
    await this.botService.updateBot(this.form.value.botId, this.form.value);
    await this.botService.refreshBots();
  }

  navigateToBotListing() {
    if (this.apiError) return;

    this.router.navigate(['/bots/', this.form.value.botId || '/dashboard']);
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
