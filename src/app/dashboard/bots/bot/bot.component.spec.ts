import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotComponent } from './bot.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../../app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BotComponent', () => {
  let component: BotComponent;
  let fixture: ComponentFixture<BotComponent>;
  let router: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotComponent ],
      imports: [ HttpClientModule, AppRoutingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = new class {
      navigate(...args: any) {}
    }

    fixture = TestBed.createComponent(BotComponent);
    component = new BotComponent(null, null, router, null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no bot found, redirects to dashboard', () => {
    const spy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  })
});
