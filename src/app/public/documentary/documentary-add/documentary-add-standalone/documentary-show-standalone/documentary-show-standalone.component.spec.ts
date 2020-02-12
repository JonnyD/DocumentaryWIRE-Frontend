import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryShowStandaloneComponent } from './documentary-show-standalone.component';

describe('DocumentaryShowStandaloneComponent', () => {
  let component: DocumentaryShowStandaloneComponent;
  let fixture: ComponentFixture<DocumentaryShowStandaloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryShowStandaloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryShowStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
