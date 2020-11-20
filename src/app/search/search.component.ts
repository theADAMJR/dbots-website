import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() search = new EventEmitter();

  ngOnInit() {    
    $('.field').on('blur', function() {
      $('body').removeClass('is-focus is-type');
    });
    
    $('.field').on('keydown', function(event) {
      $('body').addClass('is-type');
      if((event.which === 8) && $(this).val() === '') {
        $('body').removeClass('is-type');
      }
    });
  }
}
