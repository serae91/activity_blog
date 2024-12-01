import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityModalComponent } from './create-activity-modal.component';
import { MaterialModule } from '../../../core/material.module';
import { MatDialogRef } from '@angular/material/dialog';

describe('CreateActivityModalComponent', () => {
  let component: CreateActivityModalComponent;
  let fixture: ComponentFixture<CreateActivityModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActivityModalComponent],
      imports: [MaterialModule]
    });
    fixture = TestBed.createComponent(CreateActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
