import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { IDocument } from '../interface/interface.IDocument';
import { DocumentService } from '../service/Document.service';
import { DocumentEditComponent } from '../Document-edit/Document-edit.component';
import { DocumentAddComponent } from '../Document-add/Document-add.component';
import { DocumentDeleteComponent } from '../Document-delete/Document-delete.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dataService: DocumentService
  ) { }

  title: string;
  text: string;
  documents: IDocument[];

  ngOnInit() {
    this.dataService.getDocuments()
      .subscribe(res => {
        this.documents = res;
      }, err => {
        console.log(err);
      });
  }
  deleteDocument(document) {
    this.dataService.deletedocument(document.key).subscribe(res => {
    }, err => {
      alert(err);
    });
    delete this.documents[document.key];
  }

}
