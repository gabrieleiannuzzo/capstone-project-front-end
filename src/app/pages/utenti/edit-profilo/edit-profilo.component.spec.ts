import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfiloComponent } from './edit-profilo.component';

describe('EditProfiloComponent', () => {
  let component: EditProfiloComponent;
  let fixture: ComponentFixture<EditProfiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfiloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
