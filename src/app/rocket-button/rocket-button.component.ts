import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'rocket-button',
  templateUrl: './rocket-button.component.html',
  styleUrls: ['./rocket-button.component.css']
})
export class RocketButtonComponent implements AfterViewInit {
  @ViewChild('button') button: ElementRef;
  @Output() animated = new EventEmitter();
  @Input() precondition = true;

  clicked = false;

  ngAfterViewInit() {
    const d = 40;
    
    const elem = this.button.nativeElement;
    elem.querySelectorAll('.default, .success > div').forEach(text => {
      text.querySelectorAll('span').forEach((span, i) => {
        span.innerHTML = span.textContent == ' ' ? '&nbsp;' : span.textContent;
        span.style.setProperty('--d', i * d + 'ms');
        span.style.setProperty('--ds', text.querySelectorAll('span').length * d - d - i * d + 'ms');
      });
    });

    elem.addEventListener('click', e => {
      if (this.clicked || !this.precondition) return;
      this.clicked = true;

      e.preventDefault();
      if(elem.classList.contains('animated')) return; 

      elem.classList.add('animated');
      elem.classList.toggle('live');
      setTimeout(() => {
        elem.classList.remove('animated');
        this.animated.emit();
      }, 2400);
    });
  }
}
