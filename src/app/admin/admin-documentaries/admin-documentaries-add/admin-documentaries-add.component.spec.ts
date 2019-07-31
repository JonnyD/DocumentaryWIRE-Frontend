import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocumentariesAddComponent } from './admin-documentaries-add.component';

describe('AdminDocumentariesAddComponent', () => {
  let component: AdminDocumentariesAddComponent;
  let fixture: ComponentFixture<AdminDocumentariesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDocumentariesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDocumentariesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
