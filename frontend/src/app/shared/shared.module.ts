import { NgModule } from '@angular/core';
import { TextFieldDisplayComponent } from './text-field-display/text-field-display.component';
import { CommonModule } from '@angular/common';
import { DropdownItemComponent } from './dropdown-menu/dropdown-item/dropdown-item.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { CheckboxInputComponent } from './checkbox-input/checkbox-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import { FormsModule } from '@angular/forms';


const COMPONENTS = [
  CheckboxInputComponent,
  
  DropdownItemComponent,
  DropdownMenuComponent,
  SelectBoxComponent,
  TextFieldDisplayComponent,
  TextInputComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, FormsModule],
  exports: [COMPONENTS],
})
export class SharedModule {}
