import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryRecentUpdatedComponent } from './documentary-recent-updated.component';

describe('DocumentaryRecentUpdatedComponent', () => {
  let component: DocumentaryRecentUpdatedComponent;
  let fixture: ComponentFixture<DocumentaryRecentUpdatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryRecentUpdatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryRecentUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
