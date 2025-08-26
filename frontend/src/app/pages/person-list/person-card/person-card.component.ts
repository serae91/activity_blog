import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PersonDto, PersonListDto } from '../../../_api/person.dto';
import { PersonService } from '../../../core/services/person/person.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonModalComponent } from '../person-modal/person-modal.component';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent {
  @Input()
  personListDto!: PersonListDto;

  @Output()
  updatePersonEvent = new EventEmitter<PersonDto>();
  @Output()
  deletePersonEvent = new EventEmitter<number>();

  datePipe = new DatePipe('en-US');

  personService = inject(PersonService);
  dialog = inject(MatDialog);

  openUpdatePersonModal(): void {
    this.dialog
      .open(PersonModalComponent, { data: this.personListDto.person })
      .afterClosed()
      .subscribe((person: PersonDto) => {
        this.updatePersonEvent.emit(person);
      });
  }

  deletePerson(): void {
    this.personService
      .deletePerson(this.personListDto.person.id)
      .subscribe(() =>
        this.deletePersonEvent.emit(this.personListDto.person.id)
      );
  }

  canPersonBeDeleted(): boolean {
    return !this.personListDto?.activityCount;
  }

  getDateString(date: Date): string {
    return this.getDateTimeString(date).substring(0, 11);
  }

  private getDateTimeString(date: Date): string {
    return (
      this.datePipe
        .transform(date.toString().substring(0, 19), 'dd MMM YYYY HH:mm:ss')
        ?.toString() ?? ''
    );
  }
}
