import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LocationCreateDto,
  LocationDto,
  LocationListDto,
  LocationUpdateDto,
} from 'src/app/_api/location.dto';
import { BaseService } from '../base.service';
import { ConfirmationModalDataDto } from '../../../shared/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends BaseService {
  constructor() {
    super();
    this.setBaseUrl('location');
  }

  getLocationById(locationId: number): Observable<LocationDto> {
    return this.get<LocationDto>(
      `/${locationId}`,
      (error) => `Error loading Location by id: ${error.statusText}`
    );
  }

  getAllLocations(): Observable<LocationDto[]> {
    return this.get<LocationDto[]>(
      `/all`,
      (error) => `Error loading all Locations: ${error.statusText}`
    );
  }

  getAllLocationListDtos(): Observable<LocationListDto[]> {
    return this.get<LocationListDto[]>(
      `/all/list`,
      (error) => `Error loading all Location list dtos: ${error.statusText}`
    );
  }

  createLocation(
    locationCreateDto: LocationCreateDto
  ): Observable<LocationDto> {
    return this.post<LocationDto, LocationCreateDto>(
      '/create',
      locationCreateDto,
      (error) => `Error creating Location: ${error.statusText}`
    );
  }

  updateLocation(
    locationUpdateDto: LocationUpdateDto
  ): Observable<LocationDto> {
    return this.post<LocationDto, LocationUpdateDto>(
      '/update',
      locationUpdateDto,
      (error) => `Error updating Location: ${error.statusText}`
    );
  }

  deleteLocation(locationId: number): Observable<void> {
    return this.delete<void>(
      `/${locationId}`,
      {
        title: 'Delete Location',
        question: 'Do you want to delete this location?',
      } as ConfirmationModalDataDto,
      (error) => `Error deleting Location by id: ${error.error.details}`
    );
  }
}
