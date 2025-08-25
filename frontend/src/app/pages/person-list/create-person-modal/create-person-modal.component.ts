import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreatePersonDto, PersonDto } from 'src/app/_api/person.dto';
import { PersonService } from '../../../core/services/person/person.service';

@Component({
  selector: 'app-create-person-modal',
  templateUrl: './create-person-modal.component.html',
  styleUrls: ['./create-person-modal.component.scss'],
})
export class CreatePersonModalComponent {
  formGroup: UntypedFormGroup;
  persons: PersonDto[];

  datePipe = new DatePipe('en-US');

  get personIds(): FormArray {
    return this.formGroup.controls['personIds'] as FormArray;
  }

  constructor(
    private dialogRef: MatDialogRef<CreatePersonModalComponent>,
    private formBuilder: UntypedFormBuilder,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.loadAllPersons();
    this.initFormGroup();
  }

  loadAllPersons(): void {
    this.personService
      .getAllPersons()
      .subscribe((persons) => (this.persons = persons));
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      birthday: this.formBuilder.control(null),
    });
  }

  getCreatePersonDto(): CreatePersonDto {
    return {
      firstName: this.formGroup.controls['firstName'].value,
      lastName: this.formGroup.controls['lastName'].value,
      birthday: new Date(this.formGroup.controls['birthday'].value),
    } as CreatePersonDto;
  }

  savePersonAndCloseDialog(): void {
    this.personService
      .createNewPerson(this.getCreatePersonDto())
      .subscribe((newPerson) => this.dialogRef.close(newPerson));
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
