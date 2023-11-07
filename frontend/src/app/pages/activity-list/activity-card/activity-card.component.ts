import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivityDto } from 'src/app/_api/activity.dto';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {
  @Input()
  activity: ActivityDto;

  datePipe = new DatePipe('en-US');

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
