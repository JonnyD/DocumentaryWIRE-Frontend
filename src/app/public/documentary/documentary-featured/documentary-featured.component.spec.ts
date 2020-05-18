import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryFeaturedComponent } from './documentary-featured.component';

describe('DocumentaryFeaturedComponent', () => {
  let component: DocumentaryFeaturedComponent;
  let fixture: ComponentFixture<DocumentaryFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
