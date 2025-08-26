import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { ActivityDto } from '../../../_api/activity.dto';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent {
  @Input()
  activity!: ActivityDto;

  @Output()
  deleteActivityEvent = new EventEmitter<number>();

  datePipe = new DatePipe('en-US');

  getDateString(date: Date): string {
    return (
      this.datePipe
        .transform(date.toString().substring(0, 19), 'dd.MM.YYYY, HH:mm:ss')
        ?.toString() ?? ''
    );
  }
}
