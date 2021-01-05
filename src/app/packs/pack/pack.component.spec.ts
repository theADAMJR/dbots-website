import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PackComponent } from './pack.component';

describe('PackComponent', () => {
  let component: PackComponent;
  let fixture: ComponentFixture<PackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
