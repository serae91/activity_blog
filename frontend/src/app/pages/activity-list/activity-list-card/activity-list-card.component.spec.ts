import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityListCardComponent } from './activity-list-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../../core/material.module';

describe('ActivityListCardComponent', () => {
  let component: ActivityListCardComponent;
  let fixture: ComponentFixture<ActivityListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityListCardComponent],
      imports: [HttpClientTestingModule, MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
