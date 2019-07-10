import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocumentaryDetailComponent } from './admin-documentary-detail.component';

describe('AdminDocumentaryDetailComponent', () => {
  let component: AdminDocumentaryDetailComponent;
  let fixture: ComponentFixture<AdminDocumentaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDocumentaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDocumentaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
