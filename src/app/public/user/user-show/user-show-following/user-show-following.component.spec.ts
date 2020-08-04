import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowFollowingComponent } from './user-show-following.component';

describe('UserShowFollowingComponent', () => {
  let component: UserShowFollowingComponent;
  let fixture: ComponentFixture<UserShowFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShowFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
