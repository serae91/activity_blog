import { Directive, HostListener, Input, TemplateRef, ViewContainerRef, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open')isOpen: boolean = false;
  constructor(private elRef: ElementRef,private renderer: Renderer2) { }
  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
    
  }
}