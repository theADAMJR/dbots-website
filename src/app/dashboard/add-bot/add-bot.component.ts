import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import SimpleMDE from 'simplemde';
import { MatChipInputEvent } from '@angular/material/chips';
import { toIterable } from 'src/app/utils';

@Component({
  selector: 'app-add-bot',
  templateUrl: './add-bot.component.html',
  styleUrls: ['./add-bot.component.css']
})
export class AddBotComponent implements OnInit {
  toIterable = toIterable;

  // TODO: move to service
  tags = [
    'music',
    'moderation',
    'social',
    'utility'
  ];

  body = `# Lollipop gingerbread carrot cake
  ![Cupcakes](https://cdn.pixabay.com/photo/2016/01/11/07/18/cupcake-1133146__180.jpg) ![More Cupcakes](https://cdn.pixabay.com/photo/2014/05/23/23/17/dessert-352475__180.jpg)
	
  Sugar plum pastry wafer brownie. Gingerbread fruitcake jelly-o donut muffin sugar plum cookie sesame snaps candy canes. Bear claw sweet roll sugar plum *brownie chocolate cake* cupcake pastry topping candy. Candy canes cake gingerbread sweet tootsie roll apple pie chupa chups. Cotton candy pie **fruitcake**. Marzipan oat cake powder bear claw marshmallow soufflé cake jelly. Chocolate wafer soufflé lemon drops. Tiramisu liquorice sugar plum cake carrot cake. Pastry bonbon liquorice. Cheesecake fruitcake carrot cake. Sesame snaps ice cream lemon drops candy ~~cotton candy~~ chocolate bar. Oat cake chocolate lemon drops caramels carrot cake donut chupa chups tootsie roll donut. Toffee jelly liquorice jelly-o chocolate cake toffee tootsie roll apple pie.
  \`(placeholder text for placeholder purposes)\``;
  editor: SimpleMDE;

  form = new FormGroup({
    body: new FormControl(this.body, Validators.minLength(300)),
    botId: new FormControl('', [ Validators.pattern(/^\d{18}$/), Validators.required ]),
    clientId: new FormControl('', [ Validators.pattern(/^\d{18}$/), Validators.required ]),
    overview: new FormControl('a good bot with no features', [ Validators.minLength(30) ]),
    prefix: new FormControl('', Validators.required),
    tags: new FormControl([])
  });

  ngOnInit() {
    setTimeout(() => {
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
      container.onclick = container.onkeyup = () =>
        this.form.controls.body.setValue(this.editor?.value());
    }, 500);
  }

  submit() {
    this.form.controls.body.setValue(this.editor.value());
    console.log(this.form.value);
  }
}

export class Listing {
  body: string;
  botId: string;
  invite: string;
  clientId: string;
  githubUrl: string;
  overview: string;
  owners: string[];
  prefix: string;
  supportInvite: string; 
  tags: string;
  websiteUrl: string;
}