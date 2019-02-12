import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksEditComponent } from './bookmarks-edit.component';

describe('BookmarksEditComponent', () => {
  let component: BookmarksEditComponent;
  let fixture: ComponentFixture<BookmarksEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarksEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
