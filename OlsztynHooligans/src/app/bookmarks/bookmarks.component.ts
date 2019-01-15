import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  title: string;
  url: string;
}
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent {

  title: string;
  url: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(BookmarksPopupComponent, {
      width: '250px',
      data: {name: this.title, animal: this.url}
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
export class BookmarksPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<BookmarksPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
