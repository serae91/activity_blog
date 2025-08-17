import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateActivityDto, ActivityDto, UpdateActivityDto } from 'src/app/_api/activity.dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityService extends BaseService {

  constructor() {
    super();
    this.setBaseUrl('activity');
  }

  getActivityById(activityId: number, ): Observable<ActivityDto>{
    return this.get<ActivityDto>('/' + activityId, (error)=> 'Error loading activity by id');
  }

  getAllActivities(): Observable<ActivityDto[]>{
    return this.get<ActivityDto[]>('/all', (error)=> 'Error loading all activities: ' + error);
  }

  createActivity(activityCreateDto: CreateActivityDto): Observable<ActivityDto>{
    return this.post<ActivityDto>('/create', activityCreateDto, (error)=> 'Error creating activity: ' + error,(response)=> 'Successfully created activity');
  }

  updateActivity(updateActivityDto: UpdateActivityDto): Observable<ActivityDto>{
    return this.post<ActivityDto>('/update', updateActivityDto, (error)=> 'Error updating activity: ' + error,(response)=> 'Successfully updated activity');
  }

  deleteActivity(activityId: number): Observable<void>{
    return this.delete<void>('/' + activityId, (error)=> 'Error deleting activity: ' + error,(response)=> 'Successfully deleted activity');
  }
}
