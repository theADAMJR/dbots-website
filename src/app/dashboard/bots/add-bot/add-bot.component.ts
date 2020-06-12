import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import SimpleMDE from 'simplemde';
import { toIterable } from 'src/app/utils';
import { BotsService } from 'src/app/bots/bots.service';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-bot',
  templateUrl: './add-bot.component.html',
  styleUrls: ['./add-bot.component.css']
})
export class AddBotComponent implements AfterViewInit {
  preview = false;
  toIterable = toIterable;

  filteredTags = this.botService.tags;

  body = `# Discord Bot Best Practices
  * Commands should be **explicitly invoked**
  * Use **unique prefixes**
  * Don't overuse mentions
  * Have an \`info\` command
  * Don't reply with *'invalid command'*
  * Don't destroy Discord's API 🔥🔥🔥
  * Ignore other bots' messages
  * Use **mentioning** the bot to help users
  
  [More Info](https://github.com/meew0/discord-bot-best-practices)`;
  editor: SimpleMDE;

  form = new FormGroup({
    body: new FormControl(this.body, [ Validators.minLength(300) ]),
    botId: new FormControl('', [ Validators.pattern(/^\d{18}$/), Validators.required ]),
    clientId: new FormControl('', [ Validators.pattern(/^\d{18}$/), Validators.required ]),
    githubURL: new FormControl('', [ Validators.pattern(/https:[//]github.com/) ]),
    invite: new FormControl('', [ Validators.required, Validators.pattern(/discord.gg/) ]),
    overview: new FormControl('a good bot with no features', [ Validators.minLength(30) ]),
    ownerIds: new FormControl([], [ Validators.maxLength(3) ]),
    prefix: new FormControl('', [ Validators.required ]),
    supportInvite: new FormControl('', [ Validators.pattern(/^`[A-Za-z0-9]{7}$/) ]),
    websiteURL: new FormControl('', [ Validators.pattern(/http/) ]),
    tags: new FormControl([], [ Validators.maxLength(5) ])
  });

  constructor(
    public botService: BotsService,
    private router: Router) {}

  ngAfterViewInit() {
    const element = document.querySelector('#editor') as HTMLElement;
    this.editor = new SimpleMDE({
      element,
      toolbar: [
        'bold',
        'italic',
        'strikethrough',
        'heading',
        '|',
        'image',
        'link',
        'code',
        'quote',
        '|',
        'ordered-list',
        'unordered-list',
        'horizontal-rule',
        'table',
        '|',
        'guide'
      ]
    });

    const container = document.querySelector('.editor-container') as HTMLElement;
    container.onclick = container.onkeyup = () => {
      this.form.controls.body.setValue(this.editor?.value());
      this.updateDraft();
    };

    const draft = localStorage.getItem('botListingDraft');
    if (draft)
      this.form.setValue(JSON.parse(draft));

    this.form.valueChanges.subscribe(() => this.updateDraft());
  }

  private updateDraft() {
    localStorage.setItem('botListingDraft', JSON.stringify(this.form.value));    
  }
  
  filterTags(filter: string): void {
    this.filteredTags = this.botService.tags.filter(tag => tag.name.toLowerCase().includes(filter.toLowerCase()));
  }

  submit() {
    this.form.controls.body.setValue(this.editor.value());
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