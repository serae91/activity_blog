import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonModalComponent } from './person-modal.component';
import { MaterialModule } from '../../../core/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreatePersonModalComponent', () => {
  let component: PersonModalComponent;
  let fixture: ComponentFixture<PersonModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonModalComponent],
      imports: [HttpClientTestingModule, MaterialModule, NoopAnimationsModule],
      providers: [
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
