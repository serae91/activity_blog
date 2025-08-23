import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocationDto, LocationListDto } from '../../_api/location.dto';
import { LocationService } from '../../../app/core/services/location/location.service';
import { CreateLocationModalComponent } from './create-location-modal/create-location-modal.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  locationListDtos: LocationListDto[];

  constructor(private locationService: LocationService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.locationService.getAllLocationListDtos().subscribe(locationListDtos => this.locationListDtos = locationListDtos);
  }

  openCreateLocationModal(): void {
    this.dialog.open(CreateLocationModalComponent)
    .afterClosed()
    .subscribe((location: LocationDto) => {
      if(location) {
        this.locationListDtos.push({location, activityCount: 0} as LocationListDto)
      }
    });
  }

  onDeleteLocation(locationId: number): void {
    this.locationListDtos = this.locationListDtos.filter(locationListDto => locationListDto.location.id !== locationId);
  }
}
