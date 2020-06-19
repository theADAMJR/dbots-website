import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotsComponent } from './bots.component';

describe('BotsComponent', () => {
  let component: BotsComponent;
  let fixture: ComponentFixture<BotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`query length > 1, title shows 'Result'`, () => {
    component.query = 'a';

    expect(component.title).toBe('Results');
  });

  it('paginate, reduces array correctly', () => {
    component.page = 2;
    component.size = 4;

    const result = component.paginate([1,2,3,4,5,6,7,8]);

    expect(result).toBe([5,6,7,8]);
  });
});
