import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocumentaryDetailSeriesComponent } from './admin-documentary-detail-series.component';

describe('AdminDocumentaryDetailSeriesComponent', () => {
  let component: AdminDocumentaryDetailSeriesComponent;
  let fixture: ComponentFixture<AdminDocumentaryDetailSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDocumentaryDetailSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDocumentaryDetailSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
