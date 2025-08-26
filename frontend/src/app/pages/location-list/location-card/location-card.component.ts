import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { LocationDto, LocationListDto } from '../../../_api/location.dto';
import { LocationService } from '../../../core/services/location/location.service';
import { MatDialog } from '@angular/material/dialog';
import { LocationModalComponent } from '../location-modal/location-modal.component';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent {
  @Input()
  locationListDto!: LocationListDto;

  @Output()
  updateLocationEvent = new EventEmitter<LocationDto>();
  @Output()
  deleteLocationEvent = new EventEmitter<number>();

  locationService = inject(LocationService);
  dialog = inject(MatDialog);

  openUpdateLocationModal(): void {
    this.dialog
      .open(LocationModalComponent, { data: this.locationListDto.location })
      .afterClosed()
      .subscribe((location: LocationDto) => {
        this.updateLocationEvent.emit(location);
      });
  }

  deleteLocation(): void {
    this.locationService
      .deleteLocation(this.locationListDto.location.id)
      .subscribe(() =>
        this.deleteLocationEvent.emit(this.locationListDto.location.id)
      );
  }

  canLocationBeDeleted(): boolean {
    return !!this.locationListDto?.activityCount;
  }
}
