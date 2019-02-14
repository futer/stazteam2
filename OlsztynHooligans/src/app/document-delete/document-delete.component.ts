import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-document-delete',
  templateUrl: './document-delete.component.html',
  styleUrls: ['./document-delete.component.scss']
})
export class DocumentDeleteComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor() { }

  ngOnInit() {
  }

}
