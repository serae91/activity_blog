import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpacityScrollComponent } from './opacity-scroll/opacity-scroll.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material.module';
import { HeaderComponent } from './header/header.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

const COMPONENTS = [
  OpacityScrollComponent,
  HeaderComponent,
  ConfirmationModalComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [COMPONENTS],
})
export class SharedModule {}
