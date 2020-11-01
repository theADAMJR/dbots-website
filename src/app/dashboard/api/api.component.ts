import { Component, OnInit } from '@angular/core';
import { BotTokenService } from 'src/app/services/bot-token.service';
import { ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/services/bots.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SEOService } from 'src/app/services/seo.service';
import { SaveChangesComponent } from '../save-changes/save-changes.component';
import { Subscription } from 'rxjs';

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

  form = new FormGroup({
    voteWebhookURL: new FormControl('https://')
  });

  get id() { return this.route.snapshot.paramMap.get('id'); }

  constructor(
    private botService: BotsService,
    private tokens: BotTokenService,
    private route: ActivatedRoute,
    private saveChanges: MatSnackBar,
    private seo: SEOService) {}

  async ngOnInit() {
    await this.botService.init();

    this.bot = this.botService.getSavedBot(this.id);
    this.user = this.botService.getBot(this.id);
    this.token = await this.tokens.getToken(this.id);

    this.form.valueChanges.subscribe(() => this.openSaveChanges());

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

      // this.saveChanges$ = this.saveChanges.openFromComponent(SaveChangesComponent).afterOpened()
      // .subscribe(() => {
      //     const component = this.saveChanges._openedSnackBarRef.instance as SaveChangesComponent;
      //     component.onSave.subscribe(async() => await this.submit());
      //     component.onReset.subscribe(async() => await this.reset());
      // });        
  }
  private async reset() {
    // this.form.get('voteWebhookURL').setValue = JSON.parse(JSON.stringify(this.originalSavedToken));
    
    this.form.valueChanges
        .subscribe(() => this.openSaveChanges()); 
}

  async submit() {
    this.saveChanges.dismiss();

    await this.botService.updateWebhookURL(this.bot.id, this.form.value);
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
}
