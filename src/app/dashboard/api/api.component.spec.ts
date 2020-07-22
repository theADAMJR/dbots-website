import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APIComponent } from './api.component';
import { By } from '@angular/platform-browser';

describe('APIComponent', () => {
  let component: APIComponent;
  let fixture: ComponentFixture<APIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('token hidden, shows hidden text', () => {
    const el = fixture.debugElement.query(By.css('code')).nativeElement;

    expect(el.innerText).toBe('Hidden');
  });

  it('click toggle hidden button, calls toggleHidden', () => {
    const spy = spyOn(component, 'toggleHidden')
    const el = fixture.debugElement.query(By.css('#toggleHidden')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();

  });

  it('click copy button, calls copyToken', () => {
    const spy = spyOn(component, 'copyToken')
    const el = fixture.debugElement.query(By.css('#copy')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();

  });

  it('click regenerate button, calls regenerate', () => {
    const spy = spyOn(component, 'regenerate')
    const el = fixture.debugElement.query(By.css('#regenerate')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();

  });
});
