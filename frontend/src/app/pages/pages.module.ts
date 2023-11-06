import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';

const COMPONENTS = [
  MainComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, SharedModule],
  exports: [COMPONENTS],
})
export class PagesModule {}