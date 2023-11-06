import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent implements OnInit {
  @Input()name:string="name";
  @Output()nameEmitter:EventEmitter<string>=new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  onClick():void{
    console.log("Clicked dropdown item " + this.name);
    this.nameEmitter.emit(this.name);
  }
}
