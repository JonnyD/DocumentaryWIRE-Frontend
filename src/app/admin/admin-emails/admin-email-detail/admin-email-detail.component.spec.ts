import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmailDetailComponent } from './admin-email-detail.component';

describe('AdminEmailDetailComponent', () => {
  let component: AdminEmailDetailComponent;
  let fixture: ComponentFixture<AdminEmailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
