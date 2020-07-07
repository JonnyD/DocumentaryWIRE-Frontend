import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWatchlistEditComponent } from './admin-watchlist-edit.component';

describe('AdminWatchlistEditComponent', () => {
  let component: AdminWatchlistEditComponent;
  let fixture: ComponentFixture<AdminWatchlistEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWatchlistEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWatchlistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
