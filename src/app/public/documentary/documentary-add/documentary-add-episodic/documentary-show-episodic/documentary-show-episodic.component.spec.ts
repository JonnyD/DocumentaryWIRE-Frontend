import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryShowEpisodicComponent } from './documentary-show-episodic.component';

describe('DocumentaryShowEpisodicComponent', () => {
  let component: DocumentaryShowEpisodicComponent;
  let fixture: ComponentFixture<DocumentaryShowEpisodicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryShowEpisodicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryShowEpisodicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
