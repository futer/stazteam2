import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IBookmark } from '../interface/interface.IBookmark';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookmarkService} from '../service/bookmark.service';

@Component({
  selector: 'app-bookmarks-add',
  templateUrl: './bookmarks-add.component.html',
  styleUrls: ['./bookmarks-add.component.scss']
})

export class BookmarksAddComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: BookmarkService,
    public dialogRef: MatDialogRef<BookmarksAddComponent>,
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