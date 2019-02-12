import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksDeleteComponent } from './bookmarks-delete.component';

describe('BookmarksDeleteComponent', () => {
  let component: BookmarksDeleteComponent;
  let fixture: ComponentFixture<BookmarksDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarksDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
