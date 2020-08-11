import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesWidgetComponent } from './votes-widget.component';

describe('VotesWidgetComponent', () => {
  let component: VotesWidgetComponent;
  let fixture: ComponentFixture<VotesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
