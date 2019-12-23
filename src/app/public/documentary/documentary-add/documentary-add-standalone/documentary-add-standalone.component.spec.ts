import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryAddStandaloneComponent } from './documentary-add-standalone.component';

describe('DocumentaryAddStandaloneComponent', () => {
  let component: DocumentaryAddStandaloneComponent;
  let fixture: ComponentFixture<DocumentaryAddStandaloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryAddStandaloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryAddStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
