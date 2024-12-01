import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardComponent } from './activity-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivityDto } from '../../../_api/activity.dto';

describe('ActivityCardComponent', () => {
  let component: ActivityCardComponent;
  let fixture: ComponentFixture<ActivityCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityCardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ActivityCardComponent);
    component = fixture.componentInstance;
    component.activity = {title: 'mocktitle', author:{firstName:'mockAuthor'}} as ActivityDto;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
