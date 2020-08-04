import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowFollowersComponent } from './user-show-followers.component';

describe('UserShowFollowersComponent', () => {
  let component: UserShowFollowersComponent;
  let fixture: ComponentFixture<UserShowFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShowFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
