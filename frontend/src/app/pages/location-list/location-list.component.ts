import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocationDto, LocationListDto } from '../../_api/location.dto';
import { LocationService } from '../../core/services/location/location.service';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { PersonDto } from '../../_api/person.dto';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent implements OnInit {
  locationService = inject(LocationService);
  dialog = inject(MatDialog);
  locationListDtos = signal<LocationListDto[]>([]);

  ngOnInit(): void {
    this.locationService
      .getAllLocationListDtos()
      .subscribe((locationListDtos) =>
        this.locationListDtos.set(locationListDtos)
      );
  }

  openCreateLocationModal(): void {
    this.dialog
      .open(LocationModalComponent)
      .afterClosed()
      .subscribe((location: LocationDto) => {
        if (location) {
          this.locationListDtos.update((locations) => [
            {
              location,
              activityCount: 0,
            } as LocationListDto,
            ...locations,
          ]);
        }
      });
  }

  onUpdateLocation(location: LocationDto): void {
    this.locationListDtos.update((locationListDtos) => {
      return locationListDtos.map((locationListDto) => {
        if (locationListDto.location.id === location.id) {
          return { ...locationListDto, location: location };
        }
        return locationListDto;
      });
    });
  }

  onDeleteLocation(locationId: number): void {
    this.locationListDtos.update((locations) =>
      locations.filter(
        (locationListDto) => locationListDto.location.id !== locationId
      )
    );
  }
}
