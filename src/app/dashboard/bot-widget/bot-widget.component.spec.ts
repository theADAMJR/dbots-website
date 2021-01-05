import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BotWidgetComponent } from './bot-widget.component';

describe('BotWidgetComponent', () => {
  let component: BotWidgetComponent;
  let fixture: ComponentFixture<BotWidgetComponent>;

  beforeEach(waitForAsync(() => {
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
