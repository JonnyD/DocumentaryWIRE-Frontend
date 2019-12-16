import { AdminSeriesEditComponent } from './admin-series-edit.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('AdminStandaloneEditComponent', () => {
  let component: AdminSeriesEditComponent;
  let fixture: ComponentFixture<AdminSeriesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeriesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
