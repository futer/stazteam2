import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-matinput',
  templateUrl: './matinput.component.html',
  styleUrls: ['./matinput.component.scss']
})
export class MatinputComponent implements OnInit {

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
    console.log(input.value);
    this.childChanged.emit(input.value);
  }
}
