import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotPageComponent } from './bot-page.component';
import { AppModule } from '../app.module';

describe('BotPageComponent', () => {
  let component: BotPageComponent;
  let fixture: ComponentFixture<BotPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotPageComponent ],
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
