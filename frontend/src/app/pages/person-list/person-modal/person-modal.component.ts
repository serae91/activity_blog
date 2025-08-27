import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CreatePersonDto,
  PersonDto,
  PersonUpdateDto,
} from '../../../_api/person.dto';
import { PersonService } from '../../../core/services/person/person.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent {
  formGroup: UntypedFormGroup;
  persons: PersonDto[];

  datePipe = new DatePipe('en-US');

  get personIds(): FormArray {
    return this.formGroup.controls['personIds'] as FormArray;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: PersonDto,
    private dialogRef: MatDialogRef<PersonModalComponent>,
    private formBuilder: UntypedFormBuilder,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.loadAllPersons();
    this.initFormGroup();
  }

  isCreatingNewPerson(): boolean {
    return !this.data;
  }

  getTitle(): string {
    return this.isCreatingNewPerson() ? 'Create new person' : 'Update person';
  }

  loadAllPersons(): void {
    this.personService
      .getAllPersons()
      .subscribe(
        (persons) =>
          (this.persons = this.isCreatingNewPerson()
            ? persons
            : persons.filter((person) => person.id !== this.data.id))
      );
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      firstName: this.formBuilder.control(this.data?.firstName ?? ''),
      lastName: this.formBuilder.control(this.data?.lastName ?? ''),
      birthday: this.formBuilder.control(
        this.data?.birthday ? this.toDateInputString(this.data.birthday) : null
      ),
    });
  }

  toDateInputString(date: Date | null): string | null {
    if (!date) return null;
    return date.toString().substring(0, 10);
  }

  getPersonCreateDto(): CreatePersonDto {
    return {
      firstName: this.formGroup.controls['firstName'].value,
      lastName: this.formGroup.controls['lastName'].value,
      birthday: new Date(this.formGroup.controls['birthday'].value),
    } as CreatePersonDto;
  }

  getPersonUpdateDto(): PersonUpdateDto {
    return {
      ...this.getPersonCreateDto(),
      id: this.data.id,
    } as PersonUpdateDto;
  }

  savePersonAndCloseDialog(): void {
    this.createOrUpdatePerson().subscribe((newActivity) =>
      this.dialogRef.close(newActivity)
    );
  }

  createOrUpdatePerson(): Observable<PersonDto> {
    return !!this.data?.id
      ? this.personService.updatePerson(this.getPersonUpdateDto())
      : this.personService.createPerson(this.getPersonCreateDto());
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  canSave(): boolean {
    if (this.doesPersonAlreadyExist()) {
      return false;
    }
    return this.formGroup.valid;
  }

  doesPersonAlreadyExist(): boolean {
    if (!this.persons) return false;
    if (
      !this.formGroup.controls['firstName'].valid ||
      !this.formGroup.controls['lastName'].valid ||
      !this.formGroup.controls['birthday'].valid
    ) {
      return false;
    }
    const newPerson = {
      firstName: this.formGroup.controls['firstName'].value,
      lastName: this.formGroup.controls['lastName'].value,
      birthday: new Date(this.formGroup.controls['birthday'].value),
    } as PersonDto;
    for (let person of this.persons) {
      if (this.doPersonsEqual(person, newPerson)) {
        return true;
      }
    }
    return false;
  }

  doPersonsEqual(person1: PersonDto, person2: PersonDto): boolean {
    return (
      person1.firstName === person2.firstName &&
      person1.lastName === person2.lastName &&
      this.isSameDay(person1.birthday, person2.birthday)
    );
  }

  isSameDay(date1: Date, date2: Date): boolean {
    const dateToCheck1 = this.datePipe.transform(
      date1.toString().substring(0, date1.toString().length - 6)
    );
    const dateToCheck2 = this.datePipe.transform(
      date2.toString().substring(0, date2.toString().length - 6)
    );
    return dateToCheck1 === dateToCheck2;
  }
}
