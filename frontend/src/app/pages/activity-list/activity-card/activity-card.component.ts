import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivityDto } from '../../../_api/activity.dto';
import { ActivityService } from '../../../core/services/activity/activity.service';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { updateObjectExcludingId } from '../../../utils/update-object.utils';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent {
  @Input()
  activity: ActivityDto;

  @Output()
  deleteActivityEvent = new EventEmitter<number>();

  datePipe = new DatePipe('en-US');

  getDateString(date: Date): string {
    return this.getDateTimeString(date).substring(0, 11);
  }

  getTimeString(date: Date): string {
    return this.getDateTimeString(date).substring(12);
  }

  private getDateTimeString(date: Date): string {
    if (!date) return '';
    return (
      this.datePipe
        .transform(date.toString().substring(0, 19), 'dd MMM YYYY HH:mm:ss')
        ?.toString() ?? ''
    );
  }
}
