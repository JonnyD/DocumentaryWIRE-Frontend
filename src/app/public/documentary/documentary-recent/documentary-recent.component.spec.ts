import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryRecentComponent } from './documentary-recent.component';

describe('DocumentaryRecentComponent', () => {
  let component: DocumentaryRecentComponent;
  let fixture: ComponentFixture<DocumentaryRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
