import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePersonDto, PersonDto } from 'src/app/_api/person.dto';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  static readonly PERSON = 'person';
  static readonly ALL = '/all';
  static readonly NEW = '/new';

  constructor(private http: HttpClient){}
  
  getLocationById(locationId: number): Observable<PersonDto>{
    return this.http.get<PersonDto>(LocationService.PERSON + '/' + locationId);
  }

  getAllLocations(): Observable<PersonDto[]>{
    return this.http.get<PersonDto[]>(LocationService.PERSON + LocationService.ALL);
  }
  
  createNewLocation(activityCreateDto: CreatePersonDto): Observable<PersonDto>{
    return this.http.post<PersonDto>(LocationService.PERSON + LocationService.NEW, activityCreateDto);
  }
  
  deleteLocation(locationId: number): Observable<void>{
    return this.http.delete<void>(LocationService.PERSON + '/' + locationId);
  }
}