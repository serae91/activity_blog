import { Component } from '@angular/core';
import { FormArray, FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { LocationDto } from 'src/app/_api/location.dto';
import { PersonDto } from 'src/app/_api/person.dto';
import { LocationService } from 'src/app/core/services/location/location.service';
import { PersonService } from 'src/app/core/services/person/person.service';

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.scss']
})
export class CreateActivityModalComponent {
  formGroup: UntypedFormGroup;
  persons: PersonDto[];
  locations: LocationDto[];

  get personIds(): FormArray {
    return this.formGroup.controls['personIds'] as FormArray;
  }

  get locationIds(): FormArray {
    return this.formGroup.controls['personIds'] as FormArray;
  }

  constructor(private formBuilder: UntypedFormBuilder, private personService: PersonService, private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadAllPersons();
    this.loadAllLocations();
    this.initFormGroup();
  }

  loadAllPersons(): void {
    this.personService.getAllPersons().subscribe(persons => this.persons = persons);
  }

  loadAllLocations(): void {
    this.locationService.getAllLocations().subscribe(locations => this.locations = locations);
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      authorId: this.formBuilder.control(-1),
      title: this.formBuilder.control(''),
      description: this.formBuilder.control(''),
      postTime: this.formBuilder.control(''),
      personIds: this.formBuilder.array([this.formBuilder.control(0)]),
      locationIds: this.formBuilder.array([]),
    });
  }

  onPersonSelectionChange(event: MatOptionSelectionChange, index: number): void {
    this.personIds.controls[index].setValue(event.source.value);
  }
}
