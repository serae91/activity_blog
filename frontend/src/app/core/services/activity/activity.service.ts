import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityCreateDto, ActivityDto, ActivityFilterDto, ActivityUpdateDto } from 'src/app/_api/activity.dto';
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

  getFilteredActivities(activityFilter: ActivityFilterDto): Observable<ActivityDto[]>{
    return this.post<ActivityDto[]>('/filtered', activityFilter, (error)=> 'Error loading filtered activities: ' + error.statusText);
  }

  createActivity(activityCreateDto: ActivityCreateDto): Observable<ActivityDto>{
    return this.post<ActivityDto>('/create', activityCreateDto, (error)=> 'Error creating activity: ' + error.statusText,(response)=> 'Successfully created activity');
  }

  updateActivity(updateActivityDto: ActivityUpdateDto): Observable<ActivityDto>{
    return this.post<ActivityDto>('/update', updateActivityDto, (error)=> 'Error updating activity: ' + error.statusText,(response)=> 'Successfully updated activity');
  }

  deleteActivity(activityId: number): Observable<void>{
    return this.delete<void>('/' + activityId, (error)=> 'Error deleting activity: ' + error.statusText,(response)=> 'Successfully deleted activity');
  }
}
