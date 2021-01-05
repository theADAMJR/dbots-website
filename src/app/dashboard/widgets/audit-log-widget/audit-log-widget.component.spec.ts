import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuditLogWidgetComponent } from './audit-log-widget.component';

describe('AuditLogWidgetComponent', () => {
  let component: AuditLogWidgetComponent;
  let fixture: ComponentFixture<AuditLogWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLogWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
