import { AdminStandaloneEditComponent } from './admin-standalone-edit.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('AdminStandaloneEditComponent', () => {
  let component: AdminStandaloneEditComponent;
  let fixture: ComponentFixture<AdminStandaloneEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStandaloneEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStandaloneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
