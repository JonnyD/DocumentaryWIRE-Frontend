import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryPopularComponent } from './documentary-popular.component';

describe('DocumentaryPopularComponent', () => {
  let component: DocumentaryPopularComponent;
  let fixture: ComponentFixture<DocumentaryPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
