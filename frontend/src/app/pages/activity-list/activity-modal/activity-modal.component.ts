import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ActivityDto,
  ActivityCreateDto,
  ActivityUpdateDto,
} from '../../../_api/activity.dto';
import { LocationDto } from '../../../_api/location.dto';
import { PersonDto } from '../../../_api/person.dto';
import { ActivityService } from '../../../core/services/activity/activity.service';
import { LocationService } from '../../../core/services/location/location.service';
import { PersonService } from '../../../core/services/person/person.service';
import { Observable } from 'rxjs';
import { IdDto } from '../../../_api/id.dto';
import { getUniqueValues } from '../../../utils/update-object.utils';

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.scss'],
})
export class ActivityModalComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) private data: ActivityDto,
    private dialogRef: MatDialogRef<ActivityModalComponent>,
    private formBuilder: UntypedFormBuilder,
    private activityService: ActivityService,
    private personService: PersonService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadAllPersons();
    this.loadAllLocations();
    this.initFormGroup();
  }

  loadAllPersons(): void {
    this.personService
      .getAllPersons()
      .subscribe((persons) => (this.persons = persons));
  }

  loadAllLocations(): void {
    this.locationService
      .getAllLocations()
      .subscribe((locations) => (this.locations = locations));
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      authorId: this.formBuilder.control(this.data?.author?.id ?? null),
      title: this.formBuilder.control(this.data?.title ?? ''),
      description: this.formBuilder.control(this.data?.description ?? ''),
      personIds: [this.data?.persons?.map((person) => person.id) ?? []],
      locationIds: [this.data?.locations?.map((location) => location.id) ?? []],
    });
  }

  getTitle(): string {
    return !this.data?.id ? 'Create new Activity' : 'Update Activity';
  }

  isPersonSelected(person: PersonDto): boolean {
    const selectedPersonIds = this.getSelectedPersons().map(
      (person) => person.id
    );
    return selectedPersonIds.includes(person.id);
  }

  isPersonSelectedAsAuthor(person: PersonDto): boolean {
    return this.formGroup.controls['authorId'].value === person.id;
  }

  getSelectedPersons(): PersonDto[] {
    if (
      !this.persons ||
      !this.formGroup?.controls['authorId'] ||
      !this.personIds
    ) {
      return [];
    }
    return this.persons.filter(
      (person) =>
        this.isPersonSelectedAsAuthor(person) ||
        this.personIds.value.includes(person.id)
    );
  }

  getActivityCreateDto(): ActivityCreateDto {
    return {
      author: { id: this.formGroup.controls['authorId'].value } as IdDto,
      title: this.formGroup.controls['title'].value,
      description: this.formGroup.controls['description'].value,
      persons: this.getToIdDtoMappedIds(this.personIds.value),
      locations: this.getToIdDtoMappedIds(this.locationIds.value),
    } as ActivityCreateDto;
  }

  getActivityUpdateDto(): ActivityUpdateDto {
    return {
      ...this.getActivityCreateDto(),
      id: this.data.id,
    } as ActivityUpdateDto;
  }

  saveActivityAndCloseDialog(): void {
    this.createOrUpdateActivity().subscribe((newActivity) =>
      this.dialogRef.close(newActivity)
    );
  }

  createOrUpdateActivity(): Observable<ActivityDto> {
    return !!this.data?.id
      ? this.activityService.updateActivity(this.getActivityUpdateDto())
      : this.activityService.createActivity(this.getActivityCreateDto());
  }

  getToIdDtoMappedIds(ids: number[]): IdDto[] {
    return getUniqueValues(ids.filter((id) => id > 0)).map(
      (id) => ({ id } as IdDto)
    );
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  canSave(): boolean {
    return this.formGroup.valid;
  }
}
