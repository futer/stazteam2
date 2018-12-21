import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() required?: string;
  @Input() type: string;
  @Input() classname: string;
  @Input() name: string;
  @Input() readonly: string;
  @Input() value: string;
  @Input() title: string;

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
