import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateActivityModalComponent } from './create-activity-modal/create-activity-modal.component';
import { of } from 'rxjs';
import { ActivityDto } from '../../_api/activity.dto';
import { ActivityService } from '../../core/services/activity/activity.service';
import { ActivityListComponent } from './activity-list.component';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;
  let activityService: ActivityService;
  let dialog: MatDialog

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    activityService = TestBed.inject(ActivityService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on Init', () => {
    const activities = [{ id: 17 }] as ActivityDto[];
    jest.spyOn(activityService, 'getAllActivities').mockReturnValue(of(activities));

    component.ngOnInit();

    expect(activityService.getAllActivities).toHaveBeenCalledWith();
    expect(component.activities).toBe(activities);
  });

  it('should openCreateActivityModal', () => {
    component.activities = [];
    const activity = { id: 17 } as ActivityDto;
    const dialogRef = {
      afterClosed: () => of(undefined)
    } as MatDialogRef<CreateActivityModalComponent>;
    jest.spyOn(dialog, 'open').mockReturnValue(dialogRef);
    jest.spyOn(dialogRef, 'afterClosed').mockReturnValue(of(activity));

    component.openCreateActivityModal();

    expect(dialog.open).toHaveBeenCalledWith(CreateActivityModalComponent);
    expect(dialogRef.afterClosed).toHaveBeenCalledWith();
    expect(component.activities).toEqual([activity]);
  });
});
