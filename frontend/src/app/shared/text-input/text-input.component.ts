import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() inputLabel: string = '';
  textInput: string = '';
  constructor() {}

  ngOnInit(): void {}
  onConfirm(input: any) {
    this.textInput = input.value;
  }
}
