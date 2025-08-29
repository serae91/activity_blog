import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationService } from '../../../core/services/location/location.service';
import {
  LocationCreateDto,
  LocationDto,
  LocationUpdateDto,
} from '../../../_api/location.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent implements OnInit {
  private data = inject<LocationDto>(MAT_DIALOG_DATA);
  private dialogRef =
    inject<MatDialogRef<LocationModalComponent>>(MatDialogRef);
  private formBuilder = inject(UntypedFormBuilder);
  private locationService = inject(LocationService);

  formGroup: UntypedFormGroup;
  locations: LocationDto[];

  get personIds(): FormArray {
    return this.formGroup.controls['personIds'] as FormArray;
  }

  constructor() {}

  ngOnInit(): void {
    this.loadAllLocations();
    this.initFormGroup();
  }

  isCreatingNewLocation(): boolean {
    return !this.data;
  }

  getTitle(): string {
    return this.isCreatingNewLocation()
      ? 'Create new location'
      : 'Update location';
  }

  loadAllLocations(): void {
    this.locationService
      .getAllLocations()
      .subscribe(
        (locations) =>
          (this.locations = this.isCreatingNewLocation()
            ? locations
            : locations.filter((location) => location.id !== this.data.id))
      );
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control(this.data?.name ?? ''),
      street: this.formBuilder.control(this.data?.street ?? ''),
      streetNumber: this.formBuilder.control(this.data?.streetNumber ?? null),
      postalCode: this.formBuilder.control(this.data?.postalCode ?? null),
      city: this.formBuilder.control(this.data?.city ?? ''),
      country: this.formBuilder.control(this.data?.country ?? ''),
    });
  }

  getLocationCreateDto(): LocationCreateDto {
    return {
      name: this.formGroup.controls['name'].value,
      street: this.formGroup.controls['street'].value,
      streetNumber: this.formGroup.controls['streetNumber'].value,
      postalCode: this.formGroup.controls['postalCode'].value,
      city: this.formGroup.controls['city'].value,
      country: this.formGroup.controls['country'].value,
    } as LocationCreateDto;
  }

  getLocationUpdateDto(): LocationUpdateDto {
    return {
      ...this.getLocationCreateDto(),
      id: this.data.id,
    } as LocationUpdateDto;
  }

  saveLocationAndCloseDialog(): void {
    this.createOrUpdateLocation().subscribe((newActivity) =>
      this.dialogRef.close(newActivity)
    );
  }

  createOrUpdateLocation(): Observable<LocationDto> {
    return this.data?.id
      ? this.locationService.updateLocation(this.getLocationUpdateDto())
      : this.locationService.createLocation(this.getLocationCreateDto());
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  canSave(): boolean {
    if (
      this.doesLocationNameAlreadyExist() ||
      this.doesLocationAlreadyExist()
    ) {
      return false;
    }
    return this.formGroup.valid;
  }

  doesLocationNameAlreadyExist(): boolean {
    if (!this.formGroup.controls['name'].value) {
      return false;
    }
    const locationNames = this.locations.map((location) => location.name);
    if (locationNames.includes(this.formGroup.controls['name'].value)) {
      return true;
    }
    return false;
  }

  doesLocationAlreadyExist(): boolean {
    if (!this.formGroup.valid) {
      return false;
    }
    const createLocationDto = this.getLocationCreateDto();
    for (const location of this.locations) {
      if (
        location.city === createLocationDto.city &&
        location.country === createLocationDto.country &&
        location.postalCode === createLocationDto.postalCode &&
        location.street === createLocationDto.street &&
        location.streetNumber === createLocationDto.streetNumber
      ) {
        return true;
      }
    }
    return false;
  }
}
