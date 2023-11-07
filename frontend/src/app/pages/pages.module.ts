import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { SharedModule } from '../shared/shared.module';

const COMPONENTS = [
  ActivityListComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, SharedModule],
  exports: [COMPONENTS],
})
export class PagesModule {}