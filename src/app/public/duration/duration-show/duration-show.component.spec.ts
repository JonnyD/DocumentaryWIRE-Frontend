import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationShowComponent } from './duration-show.component';

describe('DurationShowComponent', () => {
  let component: DurationShowComponent;
  let fixture: ComponentFixture<DurationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
