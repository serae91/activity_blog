import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivityFilterDto } from '../../../_api/activity.dto';
import { PersonService } from '../../../core/services/person/person.service';
import { LocationService } from '../../../core/services/location/location.service';
import { PersonDto } from '../../../_api/person.dto';
import { LocationDto } from '../../../_api/location.dto';

@Component({
  selector: 'app-activity-filter',
  templateUrl: './activity-filter.component.html',
  styleUrl: './activity-filter.component.scss',
})
export class ActivityFilterComponent implements OnInit {
  @Input()
  activityFilter: ActivityFilterDto;

  @Output()
  activityFilterChange = new EventEmitter<ActivityFilterDto>();

  personService = inject(PersonService);
  locationService = inject(LocationService);

  persons: PersonDto[];
  locations: LocationDto[];

  ngOnInit() {
    this.personService
      .getAllPersons()
      .subscribe((persons) => (this.persons = persons));
    this.locationService
      .getAllLocations()
      .subscribe((locations) => (this.locations = locations));
  }

  isPersonSelected(person: PersonDto): boolean {
    if (!this.activityFilter?.personIds) return false;
    return this.activityFilter.personIds.includes(person.id);
  }

  isPersonSelectedAsAuthor(person: PersonDto): boolean {
    if (!this.activityFilter?.authorId) return false;
    return this.activityFilter.authorId === person.id;
  }
}
