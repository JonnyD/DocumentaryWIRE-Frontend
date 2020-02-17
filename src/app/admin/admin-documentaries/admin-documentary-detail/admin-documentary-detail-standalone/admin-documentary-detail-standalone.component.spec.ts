import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocumentaryDetailStandaloneComponent } from './admin-documentary-detail-standalone.component';

describe('AdminDocumentaryDetailStandaloneComponent', () => {
  let component: AdminDocumentaryDetailStandaloneComponent;
  let fixture: ComponentFixture<AdminDocumentaryDetailStandaloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDocumentaryDetailStandaloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDocumentaryDetailStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
