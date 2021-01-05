import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BotLogComponent } from './bot-log.component';

describe('BotLogComponent', () => {
  let component: BotLogComponent;
  let fixture: ComponentFixture<BotLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BotLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
