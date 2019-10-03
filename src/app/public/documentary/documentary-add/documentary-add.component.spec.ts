import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryAddComponent } from './documentary-add.component';

describe('DocumentaryAddComponent', () => {
  let component: DocumentaryAddComponent;
  let fixture: ComponentFixture<DocumentaryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
