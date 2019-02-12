import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IBookmark } from '../interface/interface.IBookmark';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookmarkService} from '../service/bookmark.service';

@Component({
  selector: 'app-bookmarks-edit',
  templateUrl: './bookmarks-edit.component.html',
  styleUrls: ['./bookmarks-edit.component.scss']
})
export class BookmarksEditComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: BookmarkService,
    public dialogRef: MatDialogRef<BookmarksEditComponent>,
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
