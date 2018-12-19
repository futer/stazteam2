import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentIndexBoxComponent } from './document-index-box.component';

describe('DocumentIndexBoxComponent', () => {
  let component: DocumentIndexBoxComponent;
  let fixture: ComponentFixture<DocumentIndexBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentIndexBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentIndexBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
