import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IBookmark } from '../interface/interface.IBookmark';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BookmarkService} from '../service/bookmark.service';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder,
    private dataService: BookmarkService, public data: IBookmark) { }

  title: string;
  url: string;
  bookmarks: IBookmark;

ngOnInit() {
  this.dataService.getbookmarks()
  .subscribe(res => {
    console.log(res);
    this.bookmarks = res;
  }, err => {
    console.log(err);
  });
}

  openDialog(): void {
    const dialogRef = this.dialog.open(BookmarksPopupComponent, {
      width: '250px',
      data: { title: this.title, url: this.url }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks-popup.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksPopupComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private dataService: BookmarkService,
    public dialogRef: MatDialogRef<BookmarksPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: IBookmark) { }

  bookmark1: IBookmark;
  bookmarkForm: FormGroup;

  ngOnInit() {
    // console.log('a');
    this.bookmark1 = { title: '', url: '', };
    console.log(this.bookmark1.title);
    this.bookmarkForm = this.formBuilder.group({
      'title': [''],
      'url': [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // eventEmitter function
  onChangeTitle(value) {
    console.log(this.bookmark1.title);
    this.bookmark1.title = value;
  }

  onChangeUrl(value) {
    console.log(this.bookmark1.url);
    this.bookmark1.url = value;
  }
  get f() { return this.bookmarkForm.controls; }

  onSubmit() {

    this.bookmarkForm = this.formBuilder.group({
      'title': [this.bookmark1.title, [Validators.required, Validators.maxLength(20)]],
      'url': [this.bookmark1.url, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
    console.log(this.bookmark1);
    this.dataService.postbookmark(this.bookmark1).subscribe(res => {
    }, (err) => {
      console.log(err);
    });
    this.dialogRef.close();
  }
}


