import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonModalComponent } from './person-modal.component';
import { MaterialModule } from '../../../core/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PersonDto } from '../../../_api/person.dto';

describe('PersonModalComponent', () => {
  let component: PersonModalComponent;
  let fixture: ComponentFixture<PersonModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonModalComponent],
      imports: [HttpClientTestingModule, MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} as PersonDto },
        {
          provide: MatDialogRef,
          useValue: {} as MatDialogRef<PersonModalComponent>,
        },
      ],
    });
    fixture = TestBed.createComponent(PersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
