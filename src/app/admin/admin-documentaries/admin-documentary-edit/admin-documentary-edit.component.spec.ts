import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocumentaryEditComponent } from './admin-documentary-edit.component';

describe('AdminDocumentaryEditComponent', () => {
  let component: AdminDocumentaryEditComponent;
  let fixture: ComponentFixture<AdminDocumentaryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDocumentaryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDocumentaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
