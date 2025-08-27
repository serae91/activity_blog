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
    component.activities.set([]);
    component.openedActivity.set(null);
    const activities = [{ id: 17 }, { id: 18 }] as ActivityDto[];
    jest
      .spyOn(activityService, 'getFilteredActivities')
      .mockReturnValue(of(activities));

    component.ngOnInit();

    expect(activityService.getFilteredActivities).toHaveBeenCalledWith(
      component.activityFilter
    );
    expect(component.activities()).toBe(activities);
    expect(component.openedActivity()).toEqual({ id: 17 });
  });

  it('should openCreateActivityModal and return activity', () => {
    component.activities.set([]);
    component.openedActivity.set(null);
    const activity = { id: 17 } as ActivityDto;
    const dialogRef = {
      afterClosed: () => of(undefined),
    } as MatDialogRef<ActivityModalComponent>;
    jest.spyOn(dialog, 'open').mockReturnValue(dialogRef);
    jest.spyOn(dialogRef, 'afterClosed').mockReturnValue(of(activity));

    component.openActivityModal();

    expect(dialog.open).toHaveBeenCalledWith(ActivityModalComponent);
    expect(dialogRef.afterClosed).toHaveBeenCalledWith();
    expect(component.activities()).toEqual([activity]);
    expect(component.openedActivity()).toBe(activity);
  });

  it('should openCreateActivityModal and return undefined', () => {
    component.activities.set([{ id: 3 }] as ActivityDto[]);
    component.openedActivity.set({ id: 4 } as ActivityDto);
    const activity = { id: 17 } as ActivityDto;
    const dialogRef = {
      afterClosed: () => of(undefined),
    } as MatDialogRef<ActivityModalComponent>;
    jest.spyOn(dialog, 'open').mockReturnValue(dialogRef);
    jest.spyOn(dialogRef, 'afterClosed').mockReturnValue(of(undefined));

    component.openActivityModal();

    expect(dialog.open).toHaveBeenCalledWith(ActivityModalComponent);
    expect(dialogRef.afterClosed).toHaveBeenCalledWith();
    expect(component.activities()).toEqual([{ id: 3 }]);
    expect(component.openedActivity()).toEqual({ id: 4 });
  });

  it('should onUpdateActivity with different opened activity', () => {
    component.activities.set([
      { id: 13 },
      { id: 17 },
      { id: 18 },
    ] as ActivityDto[]);
    component.openedActivity.set(component.activities()[0]);
    const activity = { id: 17, title: 'title' } as ActivityDto;

    component.onUpdateActivity(activity);

    expect(component.activities()).toEqual([
      { id: 13 },
      { id: 17, title: 'title' },
      { id: 18 },
    ]);
    expect(component.openedActivity()).toEqual({ id: 13 });
  });

  it('should onUpdateActivity with same opened activity', () => {
    component.activities.set([
      { id: 13 },
      { id: 17 },
      { id: 18 },
    ] as ActivityDto[]);
    component.openedActivity.set(component.activities()[1]);
    const activity = { id: 17, title: 'title' } as ActivityDto;

    component.onUpdateActivity(activity);

    expect(component.activities()).toEqual([
      { id: 13 },
      { id: 17, title: 'title' },
      { id: 18 },
    ]);
    expect(component.openedActivity()).toEqual({ id: 17, title: 'title' });
  });

  it('should onDeleteActivity with opened activity being deleted activity', () => {
    component.activities.set([
      { id: 13 },
      { id: 17 },
      { id: 18 },
      { id: 40 },
    ] as ActivityDto[]);
    component.openedActivity.set({ id: 18 } as ActivityDto);
    component.onDeleteActivity(18);
    expect(component.activities()).toEqual([
      { id: 13 },
      { id: 17 },
      { id: 40 },
    ]);
    expect(component.openedActivity()).toEqual({ id: 13 });
  });

  it('should onDeleteActivity with opened activity not being deleted activity', () => {
    component.activities.set([
      { id: 13 },
      { id: 17 },
      { id: 18 },
      { id: 40 },
    ] as ActivityDto[]);
    component.openedActivity.set({ id: 18 } as ActivityDto);
    component.onDeleteActivity(17);
    expect(component.activities()).toEqual([
      { id: 13 },
      { id: 18 },
      { id: 40 },
    ]);
    expect(component.openedActivity()).toEqual({ id: 18 });
  });

  it('should onOpenActivity', () => {
    component.activities.set([
      { id: 13, title: 'title13' },
      { id: 17, title: 'title17' },
      { id: 18, title: 'title18' },
      { id: 40, title: 'title40' },
    ] as ActivityDto[]);
    component.openedActivity.set(null);
    component.onOpenActivity(17);
    expect(component.openedActivity()).toEqual({ id: 17, title: 'title17' });
  });

  it('should onActivityFilterChange', () => {
    const mockDrawer = {
      close: jest.fn(),
    };
    component.drawer = mockDrawer as any;
    jest.spyOn(component, 'loadActivities').mockReturnValue(undefined);
    component.onActivityFilterChange();
    expect(component.loadActivities).toHaveBeenCalledWith();
    expect(component.drawer.close).toHaveBeenCalledWith();
  });

  it('should loadActivities with result', () => {
    component.activities.set([]);
    component.openedActivity.set(null);
    component.activityFilter = { authorId: 77 } as ActivityFilterDto;
    const filteredActivities = [{ id: 1 }, { id: 23 }] as ActivityDto[];
    jest
      .spyOn(activityService, 'getFilteredActivities')
      .mockReturnValue(of(filteredActivities));
    component.loadActivities();
    expect(component.activities()).toBe(filteredActivities);
    expect(component.openedActivity()).toBe(filteredActivities[0]);
  });

  it('should loadActivities with empty result', () => {
    component.activities.set([{ id: 1 }, { id: 56 }] as ActivityDto[]);
    component.openedActivity.set({ id: 1 } as ActivityDto);
    component.activityFilter = { authorId: 77 } as ActivityFilterDto;
    jest
      .spyOn(activityService, 'getFilteredActivities')
      .mockReturnValue(of([]));
    component.loadActivities();
    expect(component.activities()).toEqual([]);
    expect(component.openedActivity()).toBeNull();
  });

  it('should getForstOrNull', () => {
    expect(
      component.getFirstOrNull([{ id: 21 }, { id: 12 }] as ActivityDto[])
    ).toEqual({ id: 21 });
    expect(component.getFirstOrNull([])).toBeNull();
  });
});
