import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFooterComponent } from './home-footer.component';

describe('HomeFooterComponent', () => {
  let component: HomeFooterComponent;
  let fixture: ComponentFixture<HomeFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
