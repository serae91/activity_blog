import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PersonDto, PersonListDto } from 'src/app/_api/person.dto';
import { PersonService } from 'src/app/core/services/person/person.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {
  @Input()
  personListDto: PersonListDto;

  @Output()
  deletePersonEvent = new EventEmitter<number>();

  datePipe = new DatePipe('en-US');

  personService = inject(PersonService);

  deletePerson(): void {
    console.log(`This Person cant be deleted, because it is listed in ${this.personListDto.activityCount} activity`)
    if(!this.canPersonBeDeleted()){
      return;
    }
    this.personService.deletePerson(this.personListDto.person.id).subscribe(() => this.deletePersonEvent.emit(this.personListDto.person.id));
  }

  canPersonBeDeleted(): boolean {
    return !this.personListDto?.activityCount;
  }

  getDateString(date: Date): string {
    return this.getDateTimeString(date).substring(0, 11);
  }

  private getDateTimeString(date: Date): string {
    return this.datePipe.transform(date.toString().substring(0, 19), 'dd MMM YYYY HH:mm:ss')?.toString() ?? '';
  }
}
