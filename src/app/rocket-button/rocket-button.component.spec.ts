import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RocketButtonComponent } from './rocket-button.component';

describe('RocketButtonComponent', () => {
  let component: RocketButtonComponent;
  let fixture: ComponentFixture<RocketButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RocketButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RocketButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
