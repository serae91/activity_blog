import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
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
  activities = signal<ActivityDto[]>([]);
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
          this.activities.update((activities) => [activity, ...activities]);
          this.openedActivity = activity;
        }
      });
  }

  onUpdateActivity(updatedActivity: ActivityDto) {
    this.activities.update((activities) =>
      activities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
    if (this.openedActivity.id === updatedActivity.id) {
      this.openedActivity = updatedActivity;
    }
  }

  onDeleteActivity(activityId: number) {
    this.activities.update((activities) => {
      const newActivities = activities.filter(
        (activity) => activity.id !== activityId
      );
      if (this.openedActivity.id === activityId) {
        this.openedActivity = this.activities()[0];
      }
      return newActivities;
    });
  }

  onOpenActivity(openedActivityId: number): void {
    const openedActivity = this.activities().find(
      (activity) => activity.id === openedActivityId
    );
    if (openedActivity) {
      this.openedActivity = openedActivity;
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
        this.activities.set(activities);
        this.openedActivity = activities[0];
      });
  }
}
