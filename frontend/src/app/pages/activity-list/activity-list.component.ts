import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivityDto } from 'src/app/_api/activity.dto';
import { ActivityService } from 'src/app/core/services/activity/activity.service';
import { CreateActivityModalComponent } from './create-activity-modal/create-activity-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  activities: ActivityDto[];
  
  constructor(private activityService: ActivityService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe(activities => this.activities = activities);
  }

  openCreateActivityModal(): void {
    this.dialog.open(CreateActivityModalComponent)
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
