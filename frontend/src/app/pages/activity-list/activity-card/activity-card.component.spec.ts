import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardComponent } from './activity-card.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivityDto } from '../../../_api/activity.dto';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ActivityCardComponent', () => {
  let component: ActivityCardComponent;
  let fixture: ComponentFixture<ActivityCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [ActivityCardComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
