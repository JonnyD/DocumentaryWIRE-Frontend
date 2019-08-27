import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentDetailComponent } from './admin-comment-detail.component';

describe('AdminCommentDetailComponent', () => {
  let component: AdminCommentDetailComponent;
  let fixture: ComponentFixture<AdminCommentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
