import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IBookmark } from '../interface/interface.IBookmark';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookmarkService} from '../service/bookmark.service';
import { BookmarksEditComponent } from '../bookmarks-edit/bookmarks-edit.component';
import { BookmarksAddComponent } from '../bookmarks-add/bookmarks-add.component';
import { BookmarksDeleteComponent } from '../bookmarks-delete/bookmarks-delete.component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit {

  bookmarksAdd: MatDialogRef<BookmarksAddComponent>;
  bookmarksEdit: MatDialogRef<BookmarksEditComponent>;
  bookmarksDelete: MatDialogRef<BookmarksDeleteComponent>;
  constructor(
    public dialog: MatDialog,
    private dataService: BookmarkService
    ) { }

  title: string;
  text: string;
  bookmarks: IBookmark[];
  selectedBookmarks: IBookmark;

  ngOnInit() {
    this.dataService.getbookmarks()
    .subscribe(res => {
      this.bookmarks = res;
    }, err => {
      console.log(err);
    });
  }

  getBookmark(book: IBookmark) {
    this.selectedBookmarks = book;
  }

  openEditDialog(event, data) {
    this.dialog.open(BookmarksEditComponent, {
      width: '250px',
      data: data
    }).afterClosed().subscribe(item => {
      if ( item != null) {
        const a = this.bookmarks[item.key];
        a.text = item.text;
        a.title = item.title;
      }
      console.log('The edit dialog was closed');
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BookmarksAddComponent, {
      width: '250px',
      data: { title: this.title, text: this.text }
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result != null) {
      console.log(result.text);
      this.bookmarks[result.key] = { text: result.text, title: result.title };
      }
      console.log('The delete dialog was closed');
    });
  }

  openDeleteDialog(event, data) {
    this.dialog.open(BookmarksDeleteComponent, {
      width: '250px',
      data: data
    }).afterClosed().subscribe(item => {
      if ( item != null) {
        delete this.bookmarks[item.key];
      }
      console.log('The delete dialog was closed');
    });
  }
}
