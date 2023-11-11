import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonModalComponent } from './create-person-modal.component';

describe('CreatePersonModalComponent', () => {
  let component: CreatePersonModalComponent;
  let fixture: ComponentFixture<CreatePersonModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePersonModalComponent]
    });
    fixture = TestBed.createComponent(CreatePersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
