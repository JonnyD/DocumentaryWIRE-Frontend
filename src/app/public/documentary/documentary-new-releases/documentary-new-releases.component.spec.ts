import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryNewReleasesComponent } from './documentary-new-releases.component';

describe('DocumentaryNewReleasesComponent', () => {
  let component: DocumentaryNewReleasesComponent;
  let fixture: ComponentFixture<DocumentaryNewReleasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryNewReleasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryNewReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
