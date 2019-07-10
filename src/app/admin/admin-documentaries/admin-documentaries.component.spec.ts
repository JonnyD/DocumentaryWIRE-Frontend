import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocumentariesComponent } from './admin-documentaries.component';

describe('AdminDocumentariesComponent', () => {
  let component: AdminDocumentariesComponent;
  let fixture: ComponentFixture<AdminDocumentariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDocumentariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDocumentariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
