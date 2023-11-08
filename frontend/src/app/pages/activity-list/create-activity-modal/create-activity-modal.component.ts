import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PersonDto } from 'src/app/_api/person.dto';
import { PersonService } from 'src/app/core/services/person/person.service';

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.scss']
})
export class CreateActivityModalComponent {
  formGroup: UntypedFormGroup;
  persons: PersonDto[];

  constructor(private formBuilder: UntypedFormBuilder, private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe(persons => this.persons = persons);
    this.formGroup = this.formBuilder.group({
      authorId: new UntypedFormControl(-1),
      title: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
      postTime: new UntypedFormControl(''),
      personIds: new UntypedFormArray([new UntypedFormControl('Max')]),
      locationIds: new UntypedFormArray([]),
    });
  }
}
