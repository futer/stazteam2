import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IDocument } from '../interface/interface.IDocument';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../service/document.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})

export class DocumentAddComponent implements OnInit {

  public Editor = ClassicEditor;
  public editorData = '<p>Hello, world!</p>';
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

  public onChangeText({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.documentModel.text = data;
    console.log(this.documentModel.text);
  }
  get f() { return this.documentForm.controls; }

  onSubmit() {
    console.log('a');
    this.documentForm = this.formBuilder.group({
      'title': [this.documentModel.title, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      'text': [this.documentModel.text]
    });
    console.log('b');
    if (this.documentForm.invalid) {
      console.log('c');
      return;
    }
    console.log(this.documentForm);
    this.dataService.postDocument(this.documentForm.value).subscribe(res => {
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }
}
