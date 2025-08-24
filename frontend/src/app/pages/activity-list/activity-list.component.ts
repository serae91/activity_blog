import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivityDto, ActivityFilterDto } from '../../_api/activity.dto';
import { ActivityService } from '../../core/services/activity/activity.service';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {
  activityService = inject(ActivityService);
  dialog = inject(MatDialog);
  activities: ActivityDto[];
  openedActivity: ActivityDto;

  activityFilter = {} as ActivityFilterDto;

  ngOnInit(): void {
    this.activityService
      .getFilteredActivities(this.activityFilter)
      .subscribe((activities) => {
        this.activities = activities;
        this.openedActivity = activities[0];
      });
  }

  openActivityModal(): void {
    this.dialog
      .open(ActivityModalComponent)
      .afterClosed()
      .subscribe((activity: ActivityDto) => {
        if (activity) {
          this.activities.push(activity);
        }
      });
  }

  onDeleteActivity(activityId: number) {
    this.activities = this.activities.filter(
      (activity) => activity.id !== activityId
    );
  }

  onOpenActivity(openedActivityId: number): void {
    const activity = this.activities.find(
      (activity) => activity.id === openedActivityId
    );
    if (activity) {
      this.openedActivity = activity;
    }
  }
}
