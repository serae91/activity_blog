import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  constructor(private locationService: LocationService) { }

  deleteLocation(): void {
    if(!this.locationListDto.canBeDeleted){
      return;
    }
    this.locationService.deleteLocation(this.locationListDto.location.id).subscribe(() => this.deleteLocationEvent.emit(this.locationListDto.location.id));
  }
}
