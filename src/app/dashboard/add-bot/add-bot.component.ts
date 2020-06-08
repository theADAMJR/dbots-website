import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import SimpleMDE from 'simplemde';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-bot',
  templateUrl: './add-bot.component.html',
  styleUrls: ['./add-bot.component.css']
})
export class AddBotComponent implements OnInit {
  body = 'Lollipop gingerbread carrot cake. Sugar plum pastry wafer brownie. Gingerbread fruitcake jelly-o donut muffin sugar plum cookie sesame snaps candy canes. Bear claw sweet roll sugar plum brownie chocolate cake cupcake pastry topping candy. Candy canes cake gingerbread sweet tootsie roll apple pie chupa chups. Cotton candy pie fruitcake. Marzipan oat cake powder bear claw marshmallow soufflé cake jelly. Chocolate wafer soufflé lemon drops. Tiramisu liquorice sugar plum cake carrot cake. Pastry bonbon liquorice. Cheesecake fruitcake carrot cake. Sesame snaps ice cream lemon drops candy cotton candy chocolate bar. Oat cake chocolate lemon drops caramels carrot cake donut chupa chups tootsie roll donut. Toffee jelly liquorice jelly-o chocolate cake toffee tootsie roll apple pie.';
  editor: SimpleMDE;

  form = new FormGroup({
    body: new FormControl('', Validators.minLength(300)),
    botId: new FormControl('', [ Validators.pattern(/^\d{18}$/), Validators.required ]),
    clientId: new FormControl('', [ Validators.pattern(/^\d{18}$/), Validators.required ]),
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
        this.body = this.editor?.value();
    }, 1000);
  }

  submit() {
    this.form.controls.body.setValue(this.editor.value());
    console.log(this.form.value);
  }

  // input events

  /*add(event: MatChipInputEvent, array: any[]) {        
      const { value, input } = event;
  
      if ((value || '').trim())
        array.push(value.trim());
  
      if (input) 
        input.value = '';

      // this.openSaveChanges();
  }
  
  remove(item: any, array: any[]) {
      const index = array.indexOf(item);
      if (index >= 0)
          array.splice(index, 1);
      
      // this.openSaveChanges();
  }*/
}
