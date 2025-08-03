import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModalComponent } from './activity-modal.component';
import { MaterialModule } from '../../../core/material.module';
import { MatDialogRef } from '@angular/material/dialog';

describe('CreateActivityModalComponent', () => {
  let component: ActivityModalComponent;
  let fixture: ComponentFixture<ActivityModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityModalComponent],
      imports: [MaterialModule]
    });
    fixture = TestBed.createComponent(ActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
