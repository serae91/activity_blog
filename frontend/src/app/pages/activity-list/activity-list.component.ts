import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivityDto, ActivityFilterDto } from '../../_api/activity.dto';
import { ActivityService } from '../../core/services/activity/activity.service';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  activityService = inject(ActivityService);
  dialog = inject(MatDialog);
  activities: ActivityDto[];
  openedActivity: ActivityDto;

  isActivityFilterDrawerOpen = false;
  activityFilter = {} as ActivityFilterDto;

  ngOnInit(): void {
    this.loadActivities();
  }

  openActivityModal(): void {
    this.dialog
      .open(ActivityModalComponent)
      .afterClosed()
      .subscribe((activity: ActivityDto) => {
        if (activity) {
          this.activities.push(activity);
          this.openedActivity = activity;
        }
      });
  }

  onDeleteActivity(activityId: number) {
    this.activities = this.activities.filter(
      (activity) => activity.id !== activityId
    );
    if (this.openedActivity.id === activityId) {
      this.openedActivity = this.activities[0];
    }
  }

  onOpenActivity(openedActivityId: number): void {
    const activity = this.activities.find(
      (activity) => activity.id === openedActivityId
    );
    if (activity) {
      this.openedActivity = activity;
    }
  }

  onActivityFilterChange(): void {
    this.loadActivities();
    this.drawer.close();
  }

  loadActivities(): void {
    this.activityService
      .getFilteredActivities(this.activityFilter)
      .subscribe((activities) => {
        this.activities = activities;
        this.openedActivity = activities[0];
      });
  }
}
