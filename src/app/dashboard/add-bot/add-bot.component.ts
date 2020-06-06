import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import SimpleMDE from 'simplemde';

@Component({
  selector: 'app-add-bot',
  templateUrl: './add-bot.component.html',
  styleUrls: ['./add-bot.component.css']
})
export class AddBotComponent implements OnInit {
  @ViewChild('body') body;

  form = new FormGroup({
    botId: new FormControl('', Validators.pattern(/^\d{18}$/)),
    clientId: new FormControl('', Validators.pattern(/^\d{18}$/)),
    body: new FormControl('', Validators.minLength(300)),
    prefix: new FormControl('', Validators.required)
  });

  ngOnInit() {
    setTimeout(() => {
      const element = document.querySelector('#editor') as HTMLElement;
      const mde = new SimpleMDE({
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
    }, 1000);
  }

  submit() {
    console.log(this.form.value);    
  }
}
