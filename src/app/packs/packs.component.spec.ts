import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksComponent } from './packs.component';

describe('PacksComponent', () => {
  let component: PacksComponent;
  let fixture: ComponentFixture<PacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
