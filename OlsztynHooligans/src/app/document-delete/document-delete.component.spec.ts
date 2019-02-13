import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDeleteComponent } from './document-delete.component';

describe('DocumentDeleteComponent', () => {
  let component: DocumentDeleteComponent;
  let fixture: ComponentFixture<DocumentDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
