import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BotSidebarComponent } from './bot-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../../app-routing.module';

describe('BotSidebarComponent', () => {
  let component: BotSidebarComponent;
  let fixture: ComponentFixture<BotSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BotSidebarComponent ],
      imports: [ HttpClientModule, AppRoutingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
