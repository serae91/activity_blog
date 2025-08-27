import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModalComponent } from './activity-modal.component';
import { MaterialModule } from '../../../core/material.module';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivityDto } from '../../../_api/activity.dto';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ActivityService } from '../../../core/services/activity/activity.service';
import { PersonService } from '../../../core/services/person/person.service';
import { LocationService } from '../../../core/services/location/location.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ActivityModalComponent', () => {
  let component: ActivityModalComponent;
  let fixture: ComponentFixture<ActivityModalComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ActivityModalComponent],
      imports: [
        MaterialModule,
        MatDialogModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideHttpClientTesting(),
        ActivityService,
        PersonService,
        LocationService,
        //{ provide: ActivityService, useValue: {} as ActivityService },
        //{ provide: PersonService, useValue: {} as PersonService },
        //{ provide: LocationService, useValue: {} as LocationService },
        { provide: MAT_DIALOG_DATA, useValue: {} as ActivityDto }, // leeres Objekt oder gewünschte Test-Daten
        { provide: MatDialogRef, useValue: { close: () => {} } }, // Mock für DialogRef
      ],
    });
    fixture = TestBed.createComponent(ActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
