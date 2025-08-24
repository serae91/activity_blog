import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePersonDto, PersonDto, PersonListDto } from 'src/app/_api/person.dto';
import { BaseService } from '../base.service';
import { ConfirmationModalDataDto } from '../../../shared/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class PersonService extends BaseService {

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
    return this.delete<void>(`/${personId}`, {title: 'Delete Person', question: 'Do you want to delete this person?'} as ConfirmationModalDataDto,(error) => `Error deleting Person: ${error.error.details}`);
  }
}
