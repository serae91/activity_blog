import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListCardComponent } from './activity-list-card.component';

describe('ActivityListCardComponent', () => {
  let component: ActivityListCardComponent;
  let fixture: ComponentFixture<ActivityListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
