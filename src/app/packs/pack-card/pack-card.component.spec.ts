import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackCardComponent } from './pack-card.component';

describe('PackCardComponent', () => {
  let component: PackCardComponent;
  let fixture: ComponentFixture<PackCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
