import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoSourceDetailComponent } from './admin-video-source-detail.component';

describe('AdminVideoSourceDetailComponent', () => {
  let component: AdminVideoSourceDetailComponent;
  let fixture: ComponentFixture<AdminVideoSourceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideoSourceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideoSourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
