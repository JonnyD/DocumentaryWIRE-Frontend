import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryAddEpisodicComponent } from './documentary-add-episodic.component';

describe('DocumentaryAddEpisodicComponent', () => {
  let component: DocumentaryAddEpisodicComponent;
  let fixture: ComponentFixture<DocumentaryAddEpisodicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryAddEpisodicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryAddEpisodicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
