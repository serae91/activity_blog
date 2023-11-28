import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreateLocationModalComponent } from './create-location-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateLocationDto, LocationDto } from '../../../_api/location.dto';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LocationService } from '../../../core/services/location/location.service';
import { of } from 'rxjs';

describe('CreateLocationModalComponent', () => {
  let component: CreateLocationModalComponent;
  let fixture: ComponentFixture<CreateLocationModalComponent>;
  let locationService: LocationService;
  let dialogRef: MatDialogRef<CreateLocationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLocationModalComponent],
      imports:[MatDialogModule, HttpClientTestingModule],
      providers:[
        { provide: MatDialogRef, useValue: { close: (location: LocationDto) => undefined } },
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CreateLocationModalComponent);
    component = fixture.componentInstance;
    locationService = TestBed.inject(LocationService);
    dialogRef = TestBed.inject(MatDialogRef);
    component.locations = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    jest.spyOn(component, 'loadAllLocations').mockReturnValue();
    jest.spyOn(component, 'initFormGroup').mockReturnValue();
    component.ngOnInit();
    expect(component.loadAllLocations).toHaveBeenCalledWith();
    expect(component.initFormGroup).toHaveBeenCalledWith();
  });

  it('should load all locations', () => {
    const allLocations = [{id: 7}] as LocationDto[];
    jest.spyOn(locationService, 'getAllLocations').mockReturnValue(of(allLocations));
    component.loadAllLocations();
    expect(component.locations).toBe(allLocations);
  });

  it('should init form group', () => {
    component.initFormGroup();
    expect(component.formGroup.controls['name'].value).toBe('');
    expect(component.formGroup.controls['street'].value).toBe('');
    expect(component.formGroup.controls['streetNumber'].value).toBeNull();
    expect(component.formGroup.controls['postalCode'].value).toBeNull();
    expect(component.formGroup.controls['city'].value).toBe('');
    expect(component.formGroup.controls['country'].value).toBe('');
  });

  it('should save locations', () => {
    const createLocationDto = {name:'mockName'} as CreateLocationDto;
    const newLocation = {name:'newMockName'} as LocationDto;
    jest.spyOn(component, 'getCreateLocationDto').mockReturnValue(createLocationDto);
    jest.spyOn(locationService, 'createNewLocation').mockReturnValue(of(newLocation));
    jest.spyOn(dialogRef, 'close').mockReturnValue(undefined);

    component.saveLocationAndCloseDialog();

    expect(component.getCreateLocationDto).toHaveBeenCalledWith();
    expect(locationService.createNewLocation).toHaveBeenCalledWith(createLocationDto);
    expect(dialogRef.close).toHaveBeenCalledWith(newLocation);
  });
});
