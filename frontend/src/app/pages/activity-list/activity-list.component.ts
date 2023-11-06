import { Component, OnInit } from '@angular/core';
import { ActivityDto } from 'src/app/_api/activity.dto';
import { ActivityService } from 'src/app/core/services/activity/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  activities: ActivityDto[];
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe(activities => {this.activities = activities;console.log(this.activities);});
  }
}
