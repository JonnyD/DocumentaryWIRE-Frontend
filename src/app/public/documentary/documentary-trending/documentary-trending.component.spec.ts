import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryTrendingComponent } from './documentary-trending.component';

describe('DocumentaryTrendingComponent', () => {
  let component: DocumentaryTrendingComponent;
  let fixture: ComponentFixture<DocumentaryTrendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryTrendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
