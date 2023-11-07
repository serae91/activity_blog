import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityCardComponent } from './activity-list/activity-card/activity-card.component';

const COMPONENTS = [
  ActivityListComponent
];

@NgModule({
  declarations: [COMPONENTS, ActivityCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [COMPONENTS],
})
export class PagesModule {}