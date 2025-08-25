import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonModalComponent } from './create-person-modal.component';
import { MaterialModule } from '../../../core/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreatePersonModalComponent', () => {
  let component: CreatePersonModalComponent;
  let fixture: ComponentFixture<CreatePersonModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePersonModalComponent],
      imports: [HttpClientTestingModule, MaterialModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {} as MatDialogRef<CreatePersonModalComponent>,
        },
      ],
    });
    fixture = TestBed.createComponent(CreatePersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
