import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BotCardComponent } from './bot-card.component';

describe('BotCardComponent', () => {
  let component: BotCardComponent;
  let fixture: ComponentFixture<BotCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BotCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
