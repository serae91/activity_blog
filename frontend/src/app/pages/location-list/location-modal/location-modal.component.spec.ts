import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { LocationModalComponent } from './location-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LocationCreateDto, LocationDto } from '../../../_api/location.dto';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LocationService } from '../../../core/services/location/location.service';
import { of, throwError } from 'rxjs';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('CreateLocationModalComponent', () => {
  let component: LocationModalComponent;
  let fixture: ComponentFixture<LocationModalComponent>;
  let locationService: LocationService;
  let dialogRef: MatDialogRef<LocationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: (location: LocationDto) => undefined },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(LocationModalComponent);
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
    const allLocations = [{ id: 7 }] as LocationDto[];
    jest
      .spyOn(locationService, 'getAllLocations')
      .mockReturnValue(of(allLocations));
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

  it('should save locations success', () => {
    const createLocationDto = { name: 'mockName' } as LocationCreateDto;
    const newLocation = { name: 'newMockName' } as LocationDto;
    jest
      .spyOn(component, 'getLocationCreateDto')
      .mockReturnValue(createLocationDto);
    jest
      .spyOn(locationService, 'createLocation')
      .mockReturnValue(of(newLocation));
    jest.spyOn(dialogRef, 'close').mockReturnValue(undefined);

    component.saveLocationAndCloseDialog();

    expect(component.getLocationCreateDto).toHaveBeenCalledWith();
    expect(locationService.createLocation).toHaveBeenCalledWith(
      createLocationDto
    );
    expect(dialogRef.close).toHaveBeenCalledWith(newLocation);
  });

  it('should save locations error', () => {
    const createLocationDto = { name: 'mockName' } as LocationCreateDto;
    jest
      .spyOn(component, 'getLocationCreateDto')
      .mockReturnValue(createLocationDto);
    jest
      .spyOn(locationService, 'createLocation')
      .mockReturnValue(throwError('Error'));
    jest.spyOn(dialogRef, 'close').mockReturnValue(undefined);

    component.saveLocationAndCloseDialog();

    expect(component.getLocationCreateDto).toHaveBeenCalledWith();
    expect(locationService.createLocation).toHaveBeenCalledWith(
      createLocationDto
    );
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
