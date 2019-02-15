import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IDocument } from '../interface/interface.IDocument';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService} from '../service/document.service';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})

export class DocumentAddComponent implements OnInit {

  public Editor = ClassicEditor;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DocumentService,
    ) { }

  documentModel: IDocument;
  documentForm: FormGroup;

  ngOnInit() {
  this.documentModel = { title: '', text: '', confirmed: false, };
  this.documentForm = this.formBuilder.group({
    'title': [''],
    'text': [''],
  });
}

onChangeTitle(value) {
  this.documentModel.title = value;
}

onChangeText(value) {
  this.documentModel.text = value;
}
get f() { return this.documentForm.controls; }

onSubmit() {
  this.documentForm = this.formBuilder.group({
    'title': [this.documentModel.title, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    'text': [this.documentModel.text, [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]]
  });

  if (this.documentForm.invalid) {
    return;
  }
  console.log(this.documentForm);
  this.dataService.postdocument(this.documentModel).subscribe(res => {
            this.documentModel = {
              text: this.documentModel.text,
              title: this.documentModel.title,
              confirmed: this.documentModel.confirmed, };
  }, (err) => {
    console.log(err);
  });
}
}
