import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoSourceEditComponent } from './admin-video-source-edit.component';

describe('AdminVideoSourceEditComponent', () => {
  let component: AdminVideoSourceEditComponent;
  let fixture: ComponentFixture<AdminVideoSourceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideoSourceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideoSourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
