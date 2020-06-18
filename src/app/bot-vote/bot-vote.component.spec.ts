import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotVoteComponent } from './bot-vote.component';
import { By } from '@angular/platform-browser';

describe('BotVoteComponent', () => {
  let component: BotVoteComponent;
  let fixture: ComponentFixture<BotVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click vote button, vote is called', () => {
    const spy = spyOn(component, 'vote');
    const el = fixture.debugElement.query(By.css('#vote')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });
});
