import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCardComponent } from './location-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../../core/material.module';
import { LocationListDto } from '../../../_api/location.dto';

describe('LocationCardComponent', () => {
  let component: LocationCardComponent;
  let fixture: ComponentFixture<LocationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationCardComponent],
      imports: [HttpClientTestingModule, MaterialModule],
    });
    fixture = TestBed.createComponent(LocationCardComponent);
    component = fixture.componentInstance;
    component.locationListDto = {
      location: { name: 'name', street: 'street', postalCode: 123 },
    } as LocationListDto;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
