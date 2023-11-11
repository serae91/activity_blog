import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PersonDto } from 'src/app/_api/person.dto';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {
  @Input()
  person: PersonDto;

  datePipe = new DatePipe('en-US');

  getDateString(date: Date): string {
    return this.getDateTimeString(date).substring(0, 11);
  }

  private getDateTimeString(date: Date): string {
    return this.datePipe.transform(date.toString().substring(0, 19), 'dd MMM YYYY HH:mm:ss')?.toString() ?? '';
  }
}
