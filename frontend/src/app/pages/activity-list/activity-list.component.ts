import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivityDto, ActivityFilterDto } from '../../_api/activity.dto';
import { ActivityService } from '../../core/services/activity/activity.service';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  activities: ActivityDto[];

  activityFilter = {} as ActivityFilterDto;

  constructor(private activityService: ActivityService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activityService.getFilteredActivities(this.activityFilter).subscribe(activities => this.activities = activities);
  }

  openCreateActivityModal(): void {
    this.dialog.open(ActivityModalComponent)
    .afterClosed()
    .subscribe((activity: ActivityDto) => {
      if(activity) {
        this.activities.push(activity)
      }
    });
  }

  onDeleteActivity(activityId: number) {
    this.activities = this.activities.filter(activity => activity.id !== activityId);
  }
}
