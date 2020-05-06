import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationListComponent } from './duration-list.component';

describe('DurationListComponent', () => {
  let component: DurationListComponent;
  let fixture: ComponentFixture<DurationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
