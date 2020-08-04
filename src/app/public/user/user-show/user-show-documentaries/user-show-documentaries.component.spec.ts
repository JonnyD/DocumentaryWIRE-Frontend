import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowDocumentariesComponent } from './user-show-documentaries.component';

describe('UserShowDocumentariesComponent', () => {
  let component: UserShowDocumentariesComponent;
  let fixture: ComponentFixture<UserShowDocumentariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShowDocumentariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowDocumentariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
