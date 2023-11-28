import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreateLocationModalComponent } from './create-location-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LocationDto } from '../../../_api/location.dto';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateLocationModalComponent', () => {
  let component: CreateLocationModalComponent;
  let fixture: ComponentFixture<CreateLocationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLocationModalComponent],
      imports:[MatDialogModule, HttpClientTestingModule],
      providers:[
        { provide: MatDialogRef, useValue: { close: (location: LocationDto) => {} } },
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CreateLocationModalComponent);
    component = fixture.componentInstance;
    component.locations = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    jest.spyOn(component, 'loadAllLocations').mockReturnValue();
    component.ngOnInit();
    expect(component.loadAllLocations).toHaveBeenCalledWith();
  });
});
