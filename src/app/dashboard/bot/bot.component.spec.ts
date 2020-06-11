import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotComponent } from './bot.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';

describe('BotComponent', () => {
  let component: BotComponent;
  let fixture: ComponentFixture<BotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotComponent ],
      imports: [ HttpClientModule, AppRoutingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
