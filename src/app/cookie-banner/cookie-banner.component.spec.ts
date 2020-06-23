import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieBannerComponent } from './cookie-banner.component';
import { By } from '@angular/platform-browser';

describe('CookieBannerComponent', () => {
  let component: CookieBannerComponent;
  let fixture: ComponentFixture<CookieBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button click, calls agree', () => {
    const spy = spyOn(component, 'agree');
    const el = fixture.debugElement.query(By.css('button')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });
});
