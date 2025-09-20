import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityCardComponent } from './activity-list/activity-card/activity-card.component';
import { ActivityModalComponent } from './activity-list/activity-modal/activity-modal.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonCardComponent } from './person-list/person-card/person-card.component';
import { PersonModalComponent } from './person-list/person-modal/person-modal.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationModalComponent } from './location-list/location-modal/location-modal.component';
import { LocationCardComponent } from './location-list/location-card/location-card.component';
import { ActivityListCardComponent } from './activity-list/activity-list-card/activity-list-card.component';
import { ActivityFilterComponent } from './activity-list/activity-filter/activity-filter.component';
import { LoginComponent } from './auth/login/login.component';

const COMPONENTS = [
  ActivityListComponent,
  ActivityListCardComponent,
  ActivityCardComponent,
  ActivityModalComponent,
  ActivityFilterComponent,
  LocationModalComponent,
  LoginComponent,
  PersonModalComponent,
  PersonCardComponent,
  PersonListComponent,
  LocationListComponent,
];

@NgModule({
  declarations: [COMPONENTS, LocationCardComponent],
  imports: [CommonModule, FormsModule, MaterialModule, SharedModule],
  exports: [COMPONENTS],
})
export class PagesModule {}
