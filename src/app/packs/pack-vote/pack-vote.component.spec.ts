import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PackVoteComponent } from './pack-vote.component';

describe('PackVoteComponent', () => {
  let component: PackVoteComponent;
  let fixture: ComponentFixture<PackVoteComponent>;

  beforeEach(waitForAsync(() => {
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
