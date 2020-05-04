import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLatestComponent } from './community-latest.component';

describe('CommunityLatestComponent', () => {
  let component: CommunityLatestComponent;
  let fixture: ComponentFixture<CommunityLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
