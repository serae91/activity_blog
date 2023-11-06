import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  @Input()title:string = 'Title';
  @Input()items:string[]=[];
  @Output()itemEmitter:EventEmitter<string>=new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    
    
  }
  setItems(items:string[]):void{
    this.items = items;
    this.items.forEach(
      item=>console.log(item)
    )
  }
  onItemSelected(item:string):void{
    this.itemEmitter.emit(item);
  }
}
