import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  @Input() label: string = "label";
  @Input() description: string = "Select";
  @Input() values: string[] = [];
  selectList = document.getElementById("selectList");
  constructor() {
  }

  ngOnInit(): void {
  }
  setValues(values: string[]): void {
    this.values = values;
  }
  onChange(event:Event):void{
    console.log(event);
    console.log(this.selectList?.nodeValue);
  }
  onClick():void{
    console.log(this.selectList === null);
  }
}
