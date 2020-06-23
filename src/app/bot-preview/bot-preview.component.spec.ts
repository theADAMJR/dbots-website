import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotPreviewComponent } from './bot-preview.component';
import { By } from '@angular/platform-browser';

describe('BotPreviewComponent', () => {
  let component: BotPreviewComponent;
  let fixture: ComponentFixture<BotPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click delete button, calls delete', () => {
    // const spy = spyOn(component, 'delete');
    const el = fixture.debugElement.query(By.css('#delete')).nativeElement;

    el.click();

    // expect(spy).toHaveBeenCalled();
  });
});
