import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotWidgetComponent } from './bot-widget.component';

describe('BotWidgetComponent', () => {
  let component: BotWidgetComponent;
  let fixture: ComponentFixture<BotWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
