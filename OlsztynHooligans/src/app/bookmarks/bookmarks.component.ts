import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IBookmark } from '../interface/interface.IBookmark';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookmarkService} from '../service/bookmark.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit {
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
    this.dialog.open(BookmarksPopupEditComponent, {
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
    const dialogRef = this.dialog.open(BookmarksPopupComponent, {
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
    this.dialog.open(BookmarksPopupDeleteComponent, {
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

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks-popup.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksPopupComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: BookmarkService,
    public dialogRef: MatDialogRef<BookmarksPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBookmark) { }

  bookmarkModel: IBookmark;
  bookmarkForm: FormGroup;

  ngOnInit() {
    this.bookmarkModel = { title: '', text: '', };
    this.bookmarkForm = this.formBuilder.group({
      'title': [''],
      'text': [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangeTitle(value) {
    this.bookmarkModel.title = value;
  }

  onChangeText(value) {
    this.bookmarkModel.text = value;
  }
  get f() { return this.bookmarkForm.controls; }

  onSubmit() {
    this.bookmarkForm = this.formBuilder.group({
      'title': [this.bookmarkModel.title, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      'text': [this.bookmarkModel.text, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });

    if (this.bookmarkForm.invalid) {
      return;
    }
    console.log(this.bookmarkForm);
    this.dataService.postbookmark(this.bookmarkModel).subscribe(res => {
              this.bookmarkModel = { text: this.bookmarkModel.text, title: this.bookmarkModel.title };
              this.dialogRef.close(res);
    }, (err) => {
      console.log(err);
    });
  }
}

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks-popupedit.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksPopupEditComponent implements OnInit {
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: BookmarkService,
    public dialogRef: MatDialogRef<BookmarksPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dataItem = data;
    }

  bookmarkModel: IBookmark;
  bookmarkForm: FormGroup;
  dataItem: any;

  ngOnInit() {
    this.bookmarkModel = { title: this.dataItem.value.title, text: this.dataItem.value.text, key: this.dataItem.key};
    // console.log(this.bookmarkModel.title);
    this.bookmarkForm = this.formBuilder.group({
      'title': [''],
      'text': [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangeTitle(value) {
    this.bookmarkModel.title = value;
  }

  onChangeText(value) {
    this.bookmarkModel.text = value;
  }
  get f() { return this.bookmarkForm.controls; }

  onSubmit() {
    this.bookmarkForm = this.formBuilder.group({
      'title': [this.bookmarkModel.title, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      'text': [this.bookmarkModel.text, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });

    if (this.bookmarkForm.invalid) {
      return;
    }
    this.dataService.putbookmark(this.bookmarkModel).subscribe(res => {
              this.bookmarkModel = { text: this.bookmarkModel.text, title: this.bookmarkModel.title, key: this.dataItem.key };
              this.dialogRef.close(this.bookmarkModel);
    }, (err) => {
      console.log(err);
    });
  }
}

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks-popupdelete.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksPopupDeleteComponent implements OnInit {
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: BookmarkService,
    public dialogRef: MatDialogRef<BookmarksPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dataItem = data;
    }

  bookmarkModel: IBookmark;
  bookmarkForm: FormGroup;
  dataItem: any;

  ngOnInit() {
    this.bookmarkModel = { key: this.dataItem.key};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    this.dataService.deletebookmark(this.bookmarkModel).subscribe(res => {
              this.dialogRef.close(this.bookmarkModel);
    }, (err) => {
      console.log(err);
    });
  }
}