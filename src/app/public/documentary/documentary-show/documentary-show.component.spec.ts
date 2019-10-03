import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryShowComponent } from './documentary-show.component';

describe('DocumentaryShowComponent', () => {
  let component: DocumentaryShowComponent;
  let fixture: ComponentFixture<DocumentaryShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
