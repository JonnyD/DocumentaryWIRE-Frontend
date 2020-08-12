import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAboutmeComponent } from './change-about-me.component';

describe('ChangeAboutmeComponent', () => {
  let component: ChangeAboutmeComponent;
  let fixture: ComponentFixture<ChangeAboutmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAboutmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAboutmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
