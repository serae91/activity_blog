import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivityDto } from 'src/app/_api/activity.dto';
import { ActivityService } from 'src/app/core/services/activity/activity.service';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {
  @Input()
  activity: ActivityDto;

  @Output()
  deleteActivityEvent = new EventEmitter<number>();

  datePipe = new DatePipe('en-US');

  constructor(private activityService: ActivityService) {}

  deleteActivity(): void {
    this.activityService.deleteActivity(this.activity.id).subscribe(() => this.deleteActivityEvent.emit(this.activity.id));
  }

  getDateString(date: Date): string {
    return this.getDateTimeString(date).substring(0, 11);
  }

  getTimeString(date: Date): string {
    return this.getDateTimeString(date).substring(12);
  }

  private getDateTimeString(date: Date): string {
    return this.datePipe.transform(date.toString().substring(0, 19), 'dd MMM YYYY HH:mm:ss')?.toString() ?? '';
  }
}
