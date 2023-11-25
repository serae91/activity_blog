import { Component } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreatePersonDto, PersonDto } from 'src/app/_api/person.dto';
import { PersonService } from 'src/app/core/services/person/person.service';

@Component({
  selector: 'app-create-person-modal',
  templateUrl: './create-person-modal.component.html',
  styleUrls: ['./create-person-modal.component.scss']
})
export class CreatePersonModalComponent {

  formGroup: UntypedFormGroup;
  persons: PersonDto[];

  get personIds(): FormArray {
    return this.formGroup.controls['personIds'] as FormArray;
  }

  constructor(
    private dialogRef: MatDialogRef<CreatePersonModalComponent>,
    private formBuilder: UntypedFormBuilder,
    private personService: PersonService) {}

  ngOnInit(): void {
    this.loadAllPersons();
    this.initFormGroup();
  }

  loadAllPersons(): void {
    this.personService.getAllPersons().subscribe(persons => this.persons = persons);
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      birthday: this.formBuilder.control(null),
    });
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

  getCreatePersonyDto(): CreatePersonDto {
    return {
      firstName: this.formGroup.controls['firstName'].value,
      lastName: this.formGroup.controls['lastName'].value,
      birthday: this.formGroup.controls['birthday'].value
    } as CreatePersonDto;
  }

  savePersonAndCloseDialog(): void {
    this.personService.createNewPerson(this.getCreatePersonyDto())
    .subscribe(newPerson => this.dialogRef.close(newPerson));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  canSave(): boolean {
    return this.formGroup.valid;
  }
}
