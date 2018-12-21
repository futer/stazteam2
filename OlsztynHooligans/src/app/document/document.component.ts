import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  title: string;
  constructor() { }

  ngOnInit() {
    this.title = 'Default Docuemnt Title';
  }

}
