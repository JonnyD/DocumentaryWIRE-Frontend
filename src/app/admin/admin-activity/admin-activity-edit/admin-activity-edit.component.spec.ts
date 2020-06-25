import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivityEditComponent } from './admin-activity-edit.component';

describe('AdminActivityEditComponent', () => {
  let component: AdminActivityEditComponent;
  let fixture: ComponentFixture<AdminActivityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActivityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActivityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
