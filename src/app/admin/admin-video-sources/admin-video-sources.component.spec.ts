import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoSourcesComponent } from './admin-video-sources.component';

describe('AdminVideoSourcesComponent', () => {
  let component: AdminVideoSourcesComponent;
  let fixture: ComponentFixture<AdminVideoSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideoSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideoSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
