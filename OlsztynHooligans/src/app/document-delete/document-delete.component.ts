import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { IDocument } from '../interface/interface.Idocument';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService} from '../service/document.service';

@Component({
  selector: 'app-document-delete',
  templateUrl: './document-delete.component.html',
  styleUrls: ['./document-delete.component.scss']
})
export class DocumentDeleteComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DocumentService,
  ) { }

  documentModel: IDocument;
  documentForm: FormGroup;
  dataItem: any;

  ngOnInit() {

  }

  onSubmit() {

    this.dataService.deletedocument(this.documentModel).subscribe(res => {
    }, (err) => {
      console.log(err);
    });
  }
}
