import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivityService } from './_services/activity/activity.service';
import { CreateActivityDto } from './_api/activity.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'test';
  loadedPosts:string[]=[];
  constructor(private activityService: ActivityService, private http: HttpClient){}
  ngOnInit(): void {
    this.activityService.getActivityById(1).subscribe(activity => {
      console.log(activity);
      this.activityService.getAllActivities().subscribe((activities) => {
        console.log(activities);
        this.activityService.createNewActivity({title: 'stupidTitle', description: 'dumb', postTime: new Date()} as CreateActivityDto).subscribe((newActivity) => {
          console.log(newActivity);
          this.activityService.getAllActivities().subscribe((newActivities) => {
            console.log(newActivities);
          });
        });
      });
    });
    
  }

}
