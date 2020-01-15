import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSyncComponent } from './admin-sync.component';

describe('AdminSyncComponent', () => {
  let component: AdminSyncComponent;
  let fixture: ComponentFixture<AdminSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
