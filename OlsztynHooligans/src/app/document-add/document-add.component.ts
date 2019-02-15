import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor() { }

  ngOnInit() {
  }

}
