import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-int',
  templateUrl: './int.component.html',
  styleUrls: ['./int.component.css']
})
export class IntComponent implements OnInit {

  @Input() value: string = "";
  @Output() valueChange = new EventEmitter<string>();
  modelValue: number = 0;

  constructor() { }

  ngOnInit(): void {
  
  }

  ngOnChanges(): void {
    console.log(this.modelValue)
  }

  onValueChanged(value: MatSliderChange) {
    this.valueChange.emit(value.value!.toString());
  }

  formatLabel(value: number) {
    return value;
  }

}
