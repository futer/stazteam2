import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mattextarea',
  templateUrl: './mattextarea.component.html',
  styleUrls: ['./mattextarea.component.scss']
})
export class MattextareaComponent implements OnInit {

  @Input() required?: string;
  @Input() type: string;
  @Input() classname: string;
  @Input() name: string;
  @Input() readonly: string;
  @Input() value = '';
  @Input() title: string;
  @Input() placeholder = '';

  @Output()
  childChanged = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    this.childChanged.emit(this.value);
  }

  inputkeyup(input) {
    this.childChanged.emit(input.value);
  }
}
