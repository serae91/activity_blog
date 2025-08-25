import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';
import { of } from 'rxjs';
import { ActivityDto, ActivityFilterDto } from '../../_api/activity.dto';
import { ActivityService } from '../../core/services/activity/activity.service';
import { ActivityListComponent } from './activity-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;
  let activityService: ActivityService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    activityService = TestBed.inject(ActivityService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
    component.activityFilter = {} as ActivityFilterDto;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on Init', () => {
    const activities = [{ id: 17 }] as ActivityDto[];
    jest
      .spyOn(activityService, 'getFilteredActivities')
      .mockReturnValue(of(activities));

    component.ngOnInit();

    expect(activityService.getFilteredActivities).toHaveBeenCalledWith(
      component.activityFilter
    );
    expect(component.activities).toBe(activities);
  });

  it('should openCreateActivityModal', () => {
    component.activities = [];
    const activity = { id: 17 } as ActivityDto;
    const dialogRef = {
      afterClosed: () => of(undefined),
    } as MatDialogRef<ActivityModalComponent>;
    jest.spyOn(dialog, 'open').mockReturnValue(dialogRef);
    jest.spyOn(dialogRef, 'afterClosed').mockReturnValue(of(activity));

    component.openActivityModal();

    expect(dialog.open).toHaveBeenCalledWith(ActivityModalComponent);
    expect(dialogRef.afterClosed).toHaveBeenCalledWith();
    expect(component.activities).toEqual([activity]);
  });
});
