import { Component } from '@angular/core';
import { PersonDto } from 'src/app/_api/person.dto';
import { PersonService } from 'src/app/core/services/person/person.service';
import { CreatePersonModalComponent } from './create-person-modal/create-person-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent {
  persons: PersonDto[];

  constructor(private personService: PersonService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe(persons => this.persons = persons);
  }

  openCreatePersonModal(): void {
    this.dialog.open(CreatePersonModalComponent)
    .afterClosed()
    .subscribe((person: PersonDto) => {
      if(person) {
        this.persons.push(person)
      }
    });
  }
}
