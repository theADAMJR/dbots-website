import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BotSettingsComponent } from './bot-settings.component';

describe('BotSettingsComponent', () => {
  let component: BotSettingsComponent;
  let fixture: ComponentFixture<BotSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BotSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
