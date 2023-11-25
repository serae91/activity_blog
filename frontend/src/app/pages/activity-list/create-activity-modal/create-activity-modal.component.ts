import { Component } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateActivityDto } from 'src/app/_api/activity.dto';
import { LocationDto } from 'src/app/_api/location.dto';
import { PersonDto } from 'src/app/_api/person.dto';
import { ActivityService } from 'src/app/core/services/activity/activity.service';
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
    return this.formGroup.controls['locationIds'] as FormArray;
  }

  constructor(
    private dialogRef: MatDialogRef<CreateActivityModalComponent>,
    private formBuilder: UntypedFormBuilder,
    private activityService: ActivityService,
    private personService: PersonService,
    private locationService: LocationService) {}

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
      authorId: this.formBuilder.control(null),
      title: this.formBuilder.control(''),
      description: this.formBuilder.control(''),
      personIds: this.formBuilder.array([this.formBuilder.control(0)]),
      locationIds: this.formBuilder.array([this.formBuilder.control(0)]),
    });
  }

  removeParticipant(index: number) {
    this.personIds.removeAt(index);
  }
  
  addParticipant() {
    this.personIds.push(this.formBuilder.control(0))
  }

  isPersonSelected(person: PersonDto): boolean {
    const selectedPersonIds = this.getSelectedPersons().map(person => person.id);
    return selectedPersonIds.includes(person.id);
  }

  getSelectedPersons(): PersonDto[] {
    if(!this.persons || !this.formGroup?.controls['authorId'] || !this.personIds) {
      return [];
    }
    return this.persons.filter(person => this.formGroup.controls['authorId'].value === person.id || this.personIds.value.includes(person.id));
  }

  isLocationSelected(location: LocationDto): boolean {
    const selectedLocationIds = this.getSelectedLocations().map(location => location.id);
    return selectedLocationIds.includes(location.id);
  }

  getSelectedLocations(): LocationDto[] {
    if(!this.locations || !this.locationIds) {
      return [];
    }
    return this.locations.filter(location => this.locationIds.value.includes(location.id));
  }

  removeLocation(index: number) {
    this.locationIds.removeAt(index);
  }
  
  addLocation() {
    this.locationIds.push(this.formBuilder.control(0))
  }

  getCreateActivityDto(): CreateActivityDto {
    return {
      authorId: this.formGroup.controls['authorId'].value,
      title: this.formGroup.controls['title'].value,
      description: this.formGroup.controls['description'].value,
      postTime: new Date(),
      personIds: this.getUniqueValues<number>(this.personIds.value).filter(value => value > 0),
      locationIds: this.getUniqueValues<number>(this.locationIds.value).filter(value => value > 0),
    } as CreateActivityDto;
  }

  saveActivityAndCloseDialog(): void {
    console.log(this.getCreateActivityDto());
    this.activityService.createNewActivity(this.getCreateActivityDto())
    .subscribe(newActivity => this.dialogRef.close(newActivity));
  }

  getUniqueValues<T>(values: T[]): T[] {
    return values.filter((value, index, self) => index === self.indexOf(value));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  canSave(): boolean {
    return this.formGroup.valid;
  }
}
