import { Component, OnInit } from '@angular/core';
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
  personListDtos: PersonListDto[];

  constructor(
    private personService: PersonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.personService
      .getAllPersonListDtos()
      .subscribe((personListDtos) => (this.personListDtos = personListDtos));
  }

  openPersonModal(): void {
    this.dialog
      .open(PersonModalComponent)
      .afterClosed()
      .subscribe((person: PersonDto) => {
        if (person) {
          this.personListDtos.push({
            person,
            activityCount: 0,
          } as PersonListDto);
        }
      });
  }

  onDeletePerson(personId: number): void {
    this.personListDtos = this.personListDtos.filter(
      (personListDto) => personListDto.person.id !== personId
    );
  }
}
