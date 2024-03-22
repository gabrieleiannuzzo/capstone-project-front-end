import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampionatoComponent } from './edit-campionato.component';

describe('EditCampionatoComponent', () => {
  let component: EditCampionatoComponent;
  let fixture: ComponentFixture<EditCampionatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCampionatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCampionatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
