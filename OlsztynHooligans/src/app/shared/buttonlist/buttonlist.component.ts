import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttonlist',
  templateUrl: './buttonlist.component.html',
  styleUrls: ['./buttonlist.component.scss']
})
export class ButtonlistComponent implements OnInit {

  @Input() value:string;
  @Input() type:string;
  @Input() classname:string;
  constructor() { }

  ngOnInit() {
  }

}
