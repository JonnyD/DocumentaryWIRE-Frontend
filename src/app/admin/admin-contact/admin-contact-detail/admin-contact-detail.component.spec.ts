import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactDetailComponent } from './admin-contact-detail.component';

describe('AdminContactDetailComponent', () => {
  let component: AdminContactDetailComponent;
  let fixture: ComponentFixture<AdminContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContactDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
