import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotPreviewComponent } from './bot-preview.component';

describe('BotPreviewComponent', () => {
  let component: BotPreviewComponent;
  let fixture: ComponentFixture<BotPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
