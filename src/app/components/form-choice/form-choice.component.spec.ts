import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChoiceComponent } from './form-choice.component';

describe('FormChoiceComponent', () => {
  let component: FormChoiceComponent;
  let fixture: ComponentFixture<FormChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormChoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
