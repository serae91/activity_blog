import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityDto, CreateActivityDto } from 'src/app/_api/activity.dto';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  static readonly ACTIVITY = '/activity';
  static readonly ALL = '/all';
  static readonly NEW = '/new';

  constructor(private http: HttpClient){}
  
  getActivityById(activityId: number): Observable<ActivityDto>{
    return this.http.get<ActivityDto>(ActivityService.ACTIVITY + '/' + activityId);
  }

  getAllActivities(): Observable<ActivityDto[]>{
    return this.http.get<ActivityDto[]>(ActivityService.ACTIVITY + ActivityService.ALL);
  }
  
  createNewActivity(createActivityDto: CreateActivityDto): Observable<ActivityDto>{
    return this.http.post<ActivityDto>(ActivityService.ACTIVITY + ActivityService.NEW, createActivityDto);
  }
}
