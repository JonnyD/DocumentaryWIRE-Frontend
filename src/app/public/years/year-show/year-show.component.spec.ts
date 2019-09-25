import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearShowComponent } from './year-show.component';

describe('YearShowComponent', () => {
  let component: YearShowComponent;
  let fixture: ComponentFixture<YearShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
