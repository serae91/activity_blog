import { Component } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateLocationDto, LocationDto } from 'src/app/_api/location.dto';
import { LocationService } from 'src/app/core/services/location/location.service';

@Component({
  selector: 'app-create-location-modal',
  templateUrl: './create-location-modal.component.html',
  styleUrls: ['./create-location-modal.component.scss']
})
export class CreateLocationModalComponent {
  formGroup: UntypedFormGroup;
  locations: LocationDto[];

  get personIds(): FormArray {
    return this.formGroup.controls['personIds'] as FormArray;
  }

  constructor(
    private dialogRef: MatDialogRef<CreateLocationModalComponent>,
    private formBuilder: UntypedFormBuilder,
    private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadAllLocations();
    this.initFormGroup();
  }

  loadAllLocations(): void {
    this.locationService.getAllLocations().subscribe(locations => this.locations = locations);
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control(''),
      street: this.formBuilder.control(''),
      streetNumber: this.formBuilder.control(null),
      postalCode: this.formBuilder.control(null),
      city: this.formBuilder.control(''),
      country: this.formBuilder.control(''),
    });
  }

  getCreateLocationDto(): CreateLocationDto {
    return {
      name: this.formGroup.controls['name'].value,
      street: this.formGroup.controls['street'].value,
      streetNumber: this.formGroup.controls['streetNumber'].value,
      postalCode: this.formGroup.controls['postalCode'].value,
      city: this.formGroup.controls['city'].value,
      country: this.formGroup.controls['country'].value,
    } as CreateLocationDto;
  }

  saveLocationAndCloseDialog(): void {
    this.locationService.createNewLocation(this.getCreateLocationDto())
    .subscribe(newLocation => this.dialogRef.close(newLocation));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  canSave(): boolean {
    if(this.doesLocationNameAlreadyExist() || this.doesLocationAlreadyExist()) {
      return false;
    }
    return this.formGroup.valid;
  }

  doesLocationNameAlreadyExist(): boolean {
    if(!this.formGroup.controls['name'].value) {
      return false;
    }
    const locationNames = this.locations.map(location => location.name);
    if(locationNames.includes(this.formGroup.controls['name'].value)) {
      return true;
    }
    return false;
  }

  doesLocationAlreadyExist(): boolean {
    if(!this.formGroup.valid) {
      return false;
    }
    const createLocationDto = this.getCreateLocationDto();
    for(const location of this.locations) {
      if(location.city === createLocationDto.city
        && location.country === createLocationDto.country
        && location.postalCode === createLocationDto.postalCode
        && location.street === createLocationDto.street
        && location.streetNumber === createLocationDto.streetNumber
        ) {
          return true;
        }
    }
    return false;
  }
}
