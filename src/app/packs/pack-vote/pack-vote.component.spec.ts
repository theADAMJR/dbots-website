import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackVoteComponent } from './pack-vote.component';

describe('PackVoteComponent', () => {
  let component: PackVoteComponent;
  let fixture: ComponentFixture<PackVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
