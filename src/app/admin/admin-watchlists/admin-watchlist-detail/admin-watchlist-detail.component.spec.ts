import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWatchlistDetailComponent } from './admin-watchlist-detail.component';

describe('AdminWatchlistDetailComponent', () => {
  let component: AdminWatchlistDetailComponent;
  let fixture: ComponentFixture<AdminWatchlistDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWatchlistDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWatchlistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
