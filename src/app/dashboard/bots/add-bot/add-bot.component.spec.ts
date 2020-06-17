import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBotComponent } from './add-bot.component';
import { By } from '@angular/platform-browser';

describe('AddBotComponent', () => {
  let component: AddBotComponent;
  let fixture: ComponentFixture<AddBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invalid bot id, form invalid', () => {
    component.form.get('botId').setValue('123');

    expect(component.form.valid).toBeFalse();
  });

  it('valid bot id, form valid', () => {
    component.form.get('botId').setValue('598565371162656788');

    expect(component.form.valid).toBeTrue();
  });

  it('invalid client id, form invalid', () => {
    component.form.get('clientId').setValue('123');

    expect(component.form.valid).toBeFalse();
  });

  it('valid client id, form valid', () => {
    component.form.get('clientId').setValue('598565371162656788');

    expect(component.form.valid).toBeTrue();
  });

  it('add button clicked, submit() is called', () => {
    const spy = spyOn(component, 'submit');
    const el = fixture.debugElement.query(By.css('#submit')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });

  it('update button clicked in edit mode, update() is called', () => {
    component.editing = true;

    const spy = spyOn(component, 'update');
    const el = fixture.debugElement.query(By.css('#update')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });
});
