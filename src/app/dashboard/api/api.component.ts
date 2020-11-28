import { Component, OnInit } from '@angular/core';
import { BotTokenService } from 'src/app/services/bot-token.service';
import { ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/services/bots.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SEOService } from 'src/app/services/seo.service';
import { SaveChangesComponent } from '../save-changes/save-changes.component';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class APIComponent implements OnInit {
  bot: any;
  user: any;
  hidden = true;

  token = '';
  originalDocument: any;
  webhookResponse = {
    message: '',
    ok: false
  };

  saveChanges$: Subscription;

  form = new FormGroup({
    voteWebhookURL: new FormControl('https://')
  });

  get id() { return this.route.snapshot.paramMap.get('id'); }

  constructor(
    private botService: BotsService,
    private tokens: BotTokenService,
    private route: ActivatedRoute,
    private saveChanges: MatSnackBar,
    private seo: SEOService,
    private userService: UserService) {}

  async ngOnInit() {
    await this.botService.init();

    this.bot = this.botService.getSavedBot(this.id);
    this.user = this.botService.getBot(this.id);
    
    const apiDocument = await this.tokens.getAPIDocument(this.id);
    this.token = apiDocument.token;

    this.form.get('voteWebhookURL').setValue(apiDocument.voteWebhookURL);

    this.form.valueChanges.subscribe(() => this.openSaveChanges());
    this.originalDocument = this.form.value;

    this.seo.setTags({
      description: '',
      titlePrefix: this.user.tag,
      titleSuffix: 'API',
      url: `dashboard/bots/${this.id}`
    });
  }
    
  private openSaveChanges() {
      const snackBarRef = this.saveChanges._openedSnackBarRef;
      if (!this.form.valid || snackBarRef) return;

      this.saveChanges$ = this.saveChanges.openFromComponent(SaveChangesComponent).afterOpened()
      .subscribe(() => {
          const component = this.saveChanges._openedSnackBarRef.instance as SaveChangesComponent;
          component.onSave.subscribe(async() => await this.submit());
          component.onReset.subscribe(async() => await this.reset());
      });        
  }
  private async reset() {
    this.form.setValue({ ...this.originalDocument });
    this.form.valueChanges
        .subscribe(() => this.openSaveChanges()); 
}

  async submit() {
    this.saveChanges.dismiss();

    await this.botService.updateBotAPI(this.user.id, this.form.value);
  }

  async regen() {
    this.token = await this.tokens.regenToken(this.id);
  }

  toggleHidden() {
    this.hidden = !this.hidden;
  }
  async regenerate() {
    this.token = await this.tokens.regenToken(this.id);
  }
  async copyToken() {
    await navigator.clipboard.writeText(this.token);    
  }

  async testWebhook() {
    try {
      this.webhookResponse.message = await this.tokens.testWebhook(this.form.value.voteWebhookURL, {
        at: new Date(),
        by: this.userService.user.id
      });
      this.webhookResponse.ok = true;
    } catch (error) {
      this.webhookResponse.ok = false;
      this.webhookResponse.message = error?.error?.message
        ?? error?.rejection?.error?.message
        ?? error?.rejection?.error
        ?? error?.message
        ?? error;
    }
  }
}
