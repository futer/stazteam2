import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IBookmark } from '../interface/interface.IBookmark';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BookmarkService} from '../service/bookmark.service';
import { $ } from 'protractor';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder,
    private dataService: BookmarkService, ) { }

  title: string;
  text: string;
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

getBookmark(id, text) {
  console.log(id);
  this.dataService.bookmarkkey = id;
  // id i text wrzucamy do ng store
  // this.router.navigateByUrl('bookmarks' || '/url');
  // this.router.navigate(['bookmarks'], {queryParams: {id}});
  this.router.navigate(['bookmarks', id]);
}

  openDialog(): void {
    const dialogRef = this.dialog.open(BookmarksPopupComponent, {
      width: '250px',
      data: { title: this.title, text: this.text }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

  bookmarkModel: IBookmark;
  bookmarkForm: FormGroup;

  ngOnInit() {
    // console.log('a');
    this.bookmarkModel = { title: '', text: '', };
    console.log(this.bookmarkModel.title);
    this.bookmarkForm = this.formBuilder.group({
      'title': [''],
      'text': [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // eventEmitter function
  onChangeTitle(value) {
    console.log(this.bookmarkModel.title);
    this.bookmarkModel.title = value;
  }

  onChangeText(value) {
    console.log(this.bookmarkModel.text);
    this.bookmarkModel.text = value;
  }
  get f() { return this.bookmarkForm.controls; }

  onSubmit() {

    this.bookmarkForm = this.formBuilder.group({
      'title': [this.bookmarkModel.title, [Validators.required, Validators.maxLength(20)]],
      'text': [this.bookmarkModel.text, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
    console.log(this.bookmarkModel);
    this.dataService.postbookmark(this.bookmarkModel).subscribe(res => {
    }, (err) => {
      console.log(err);
    });
    this.dialogRef.close();
  }
}


