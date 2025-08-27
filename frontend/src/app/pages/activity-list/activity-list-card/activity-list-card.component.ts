import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivityDto } from '../../../_api/activity.dto';
import { MatDialog } from '@angular/material/dialog';
import { ActivityService } from '../../../core/services/activity/activity.service';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-activity-list-card',
  templateUrl: './activity-list-card.component.html',
  styleUrl: './activity-list-card.component.scss',
})
export class ActivityListCardComponent {
  @Input()
  activity!: ActivityDto;

  @Input()
  openedActivityId?: number;

  @Output()
  openActivityEvent = new EventEmitter<number>();
  @Output()
  updateActivityEvent = new EventEmitter<ActivityDto>();
  @Output()
  deleteActivityEvent = new EventEmitter<number>();

  datePipe = new DatePipe('en-US');

  constructor(
    private dialog: MatDialog,
    private activityService: ActivityService
  ) {}

  openUpdateActivityModal(): void {
    this.dialog
      .open(ActivityModalComponent, { data: this.activity })
      .afterClosed()
      .pipe(take(1))
      .subscribe((activity: ActivityDto) => {
        this.updateActivityEvent.emit(activity);
      });
  }

  deleteActivity(): void {
    this.activityService
      .deleteActivity(this.activity.id)
      .subscribe(() => this.deleteActivityEvent.emit(this.activity.id));
  }

  openActivity(): void {
    this.openActivityEvent.emit(this.activity.id);
  }

  getDateString(date: Date): string {
    return (
      this.datePipe
        .transform(date.toString().substring(0, 19), 'dd.MM.YYYY, HH:mm:ss')
        ?.toString() ?? ''
    );
  }
}
