import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateLocationDto, LocationDto } from 'src/app/_api/location.dto';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  static readonly LOCATION = 'location';
  static readonly ALL = '/all';
  static readonly NEW = '/new';

  constructor(private http: HttpClient){}
  
  getLocationById(locationId: number): Observable<LocationDto>{
    return this.http.get<LocationDto>(LocationService.LOCATION + '/' + locationId);
  }

  getAllLocations(): Observable<LocationDto[]>{
    return this.http.get<LocationDto[]>(LocationService.LOCATION + LocationService.ALL);
  }
  
  createNewLocation(createLocationDto: CreateLocationDto): Observable<LocationDto>{
    return this.http.post<LocationDto>(LocationService.LOCATION + LocationService.NEW, createLocationDto);
  }
  
  deleteLocation(locationId: number): Observable<void>{
    return this.http.delete<void>(LocationService.LOCATION + '/' + locationId);
  }
}
