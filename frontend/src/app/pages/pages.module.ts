import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityCardComponent } from './activity-list/activity-card/activity-card.component';
import { CreateActivityModalComponent } from './activity-list/create-activity-modal/create-activity-modal.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material-module';

const COMPONENTS = [
  ActivityListComponent
];

@NgModule({
  declarations: [COMPONENTS, ActivityCardComponent, CreateActivityModalComponent],
  imports: [CommonModule, FormsModule, MaterialModule, SharedModule],
  exports: [COMPONENTS],
})
export class PagesModule {}