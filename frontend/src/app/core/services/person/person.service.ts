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
  
  getPersonById(personId: number): Observable<PersonDto>{
    return this.http.get<PersonDto>(LocationService.PERSON + '/' + personId);
  }

  getAllPersons(): Observable<PersonDto[]>{
    return this.http.get<PersonDto[]>(LocationService.PERSON + LocationService.ALL);
  }
  
  createNewPerson(createPersonDto: CreatePersonDto): Observable<PersonDto>{
    return this.http.post<PersonDto>(LocationService.PERSON + LocationService.NEW, createPersonDto);
  }
  
  deletePerson(personId: number): Observable<void>{
    return this.http.delete<void>(LocationService.PERSON + '/' + personId);
  }
}