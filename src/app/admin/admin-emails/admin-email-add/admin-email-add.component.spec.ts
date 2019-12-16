import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmailAddComponent } from './admin-email-add.component';

describe('AdminEmailAddComponent', () => {
  let component: AdminEmailAddComponent;
  let fixture: ComponentFixture<AdminEmailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
