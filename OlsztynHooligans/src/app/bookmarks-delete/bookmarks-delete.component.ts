import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IBookmark } from '../interface/interface.IBookmark';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookmarkService} from '../service/bookmark.service';

@Component({
  selector: 'app-bookmarks-delete',
  templateUrl: './bookmarks-delete.component.html',
  styleUrls: ['./bookmarks-delete.component.scss']
})
export class BookmarksDeleteComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: BookmarkService,
    public dialogRef: MatDialogRef<BookmarksDeleteComponent>,
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