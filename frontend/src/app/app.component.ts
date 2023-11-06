import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivityService } from './core/services/activity/activity.service';
import { ActivityCreateDto } from './_api/activity.dto';

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
    
  }

}
