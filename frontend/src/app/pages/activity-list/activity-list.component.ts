import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivityDto, ActivityFilterDto } from '../../_api/activity.dto';
import { ActivityService } from '../../core/services/activity/activity.service';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';
import { MatSidenav } from '@angular/material/sidenav';
import { filter, take } from 'rxjs';

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
  openedActivity = signal<ActivityDto | null>(null);

  activityFilter = {} as ActivityFilterDto;

  ngOnInit(): void {
    this.loadActivities();
  }

  openActivityModal(): void {
    this.dialog
      .open(ActivityModalComponent)
      .afterClosed()
      .pipe(
        take(1),
        filter((activity): activity is ActivityDto => !!activity)
      )
      .subscribe((activity) => {
        this.activities.update((activities) => [activity, ...activities]);
        this.openedActivity.set(activity);
      });
  }

  onUpdateActivity(updatedActivity: ActivityDto) {
    this.activities.update((activities) =>
      activities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
    if (this.openedActivity()?.id === updatedActivity.id) {
      this.openedActivity.set(updatedActivity);
    }
  }

  onDeleteActivity(activityId: number) {
    this.activities.update((activities) => {
      const newActivities = activities.filter(
        (activity) => activity.id !== activityId
      );
      if (this.openedActivity()?.id === activityId) {
        this.openedActivity.set(this.getFirstOrNull(newActivities));
      }
      return newActivities;
    });
  }

  onOpenActivity(openedActivityId: number): void {
    this.openedActivity.set(
      this.activities().find((activity) => activity.id === openedActivityId) ??
        null
    );
  }

  onActivityFilterChange(): void {
    this.loadActivities();
    this.drawer.close();
  }

  loadActivities(): void {
    this.activityService
      .getFilteredActivities(this.activityFilter)
      .pipe(take(1))
      .subscribe((activities) => {
        this.activities.set(activities);
        this.openedActivity.set(this.getFirstOrNull(activities));
      });
  }

  getFirstOrNull(activities: ActivityDto[]): ActivityDto | null {
    return activities.length > 0 ? activities[0] : null;
  }
}
