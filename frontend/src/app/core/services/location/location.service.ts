import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateLocationDto, LocationDto, LocationListDto } from 'src/app/_api/location.dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends BaseService {
  static readonly LOCATION = 'location';
  static readonly ALL = '/all';
  static readonly LIST = '/list';
  static readonly NEW = '/create';

  constructor() {
    super();
    this.setBaseUrl('location');
  }

  getLocationById(locationId: number): Observable<LocationDto>{
    return this.get<LocationDto>(`/${locationId}`, (error) => `Error loading Location by id: ${error.statusText}`);
  }

  getAllLocations(): Observable<LocationDto[]>{
    return this.get<LocationDto[]>(`/all`,(error) => `Error loading all Locations: ${error.statusText}`);
  }

  getAllLocationListDtos(): Observable<LocationListDto[]>{
    return this.get<LocationListDto[]>(`/all/list`, (error) => `Error loading all Location list dtos: ${error.statusText}`);
  }

  createNewLocation(createLocationDto: CreateLocationDto): Observable<LocationDto>{
    return this.post<LocationDto>('/create', createLocationDto, (error) => `Error creating Location: ${error.statusText}`);
  }

  deleteLocation(locationId: number): Observable<void>{
    return this.delete<void>(`/${locationId}`, (error) => `Error deleting Location by id: ${error.statusText}`);
  }
}
