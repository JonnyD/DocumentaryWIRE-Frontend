import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFollowsComponent } from './admin-follows.component';

describe('AdminFollowsComponent', () => {
  let component: AdminFollowsComponent;
  let fixture: ComponentFixture<AdminFollowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFollowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
