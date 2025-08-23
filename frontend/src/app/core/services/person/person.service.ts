import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePersonDto, PersonDto, PersonListDto } from 'src/app/_api/person.dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService extends BaseService {
  static readonly PERSON = 'person';
  static readonly ALL = '/all';
  static readonly LIST = '/list';
  static readonly NEW = '/new';

  constructor() {
    super();
    this.setBaseUrl('person');
  }

  getPersonById(personId: number): Observable<PersonDto>{
    return this.get<PersonDto>(`/${personId}`, (error) => `Error loading Person by id: ${error.statusText}`);
  }

  getAllPersons(): Observable<PersonDto[]>{
    return this.get<PersonDto[]>(`/all`, (error) => `Error loading all Persons: ${error.statusText}`);
  }

  getAllPersonListDtos(): Observable<PersonListDto[]>{
    return this.get<PersonListDto[]>(`/all/list`, (error) => `Error loading all Person list dtos: ${error.statusText}`);
  }

  createNewPerson(createPersonDto: CreatePersonDto): Observable<PersonDto>{
    return this.post<PersonDto>(`/create`, createPersonDto, (error) => `Error creating Person: ${error.statusText}`);
  }

  deletePerson(personId: number): Observable<void>{
    return this.delete<void>(`/${personId}`,(error) => `Error deleting Person: ${error.statusText}`);
  }
}
