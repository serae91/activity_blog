import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { LocationListDto } from 'src/app/_api/location.dto';
import { LocationService } from 'src/app/core/services/location/location.service';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent {
  @Input()
  locationListDto: LocationListDto;

  @Output()
  deleteLocationEvent = new EventEmitter<number>();

  locationService =  inject(LocationService);

  deleteLocation(): void {
    if(!this.canLocationBeDeleted()){
      return;
    }
    this.locationService.deleteLocation(this.locationListDto.location.id).subscribe(() => this.deleteLocationEvent.emit(this.locationListDto.location.id));
  }

  canLocationBeDeleted(): boolean {
    return !this.locationListDto?.activityCount;
  }
}
