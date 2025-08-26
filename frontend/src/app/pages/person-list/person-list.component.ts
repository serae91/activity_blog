import { Component, OnInit, signal } from '@angular/core';
import { PersonDto, PersonListDto } from '../../_api/person.dto';
import { PersonService } from '../../core/services/person/person.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonModalComponent } from './person-modal/person-modal.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  personListDtos = signal<PersonListDto[]>([]);

  constructor(
    private personService: PersonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.personService
      .getAllPersonListDtos()
      .subscribe((personListDtos) => this.personListDtos.set(personListDtos));
  }

  openPersonModal(): void {
    this.dialog
      .open(PersonModalComponent)
      .afterClosed()
      .subscribe((person: PersonDto) => {
        if (person) {
          this.personListDtos.update((persons) => [
            {
              person,
              activityCount: 0,
            } as PersonListDto,
            ...persons,
          ]);
        }
      });
  }

  onUpdatePerson(person: PersonDto): void {
    this.personListDtos.update((personListDtos) => {
      return personListDtos.map((personListDto) => {
        if (personListDto.person.id === person.id) {
          return { ...personListDto, person };
        }
        return personListDto;
      });
    });
  }

  onDeletePerson(personId: number): void {
    this.personListDtos.update((personsListDtos) =>
      personsListDtos.filter(
        (personsListDto) => personsListDto.person.id !== personId
      )
    );
  }
}
