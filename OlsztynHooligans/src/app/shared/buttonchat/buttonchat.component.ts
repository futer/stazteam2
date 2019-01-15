import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttonchat',
  templateUrl: './buttonchat.component.html',
  styleUrls: ['./buttonchat.component.scss']
})
export class ButtonchatComponent implements OnInit {

  @Input() type: string;
  @Input() classname: string;

  constructor() { }

  ngOnInit() {
  }

}
