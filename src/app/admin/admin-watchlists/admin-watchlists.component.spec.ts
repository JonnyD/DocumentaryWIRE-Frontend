import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWatchlistsComponent } from './admin-watchlists.component';

describe('AdminWatchlistsComponent', () => {
  let component: AdminWatchlistsComponent;
  let fixture: ComponentFixture<AdminWatchlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWatchlistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWatchlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
