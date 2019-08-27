import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentEditComponent } from './admin-comment-edit.component';

describe('AdminCommentEditComponent', () => {
  let component: AdminCommentEditComponent;
  let fixture: ComponentFixture<AdminCommentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
