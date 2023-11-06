import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldDisplayComponent } from './text-field-display.component';

describe('TexFieldDisplayComponent', () => {
  let component: TextFieldDisplayComponent;
  let fixture: ComponentFixture<TextFieldDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextFieldDisplayComponent]
    });
    fixture = TestBed.createComponent(TextFieldDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
