import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPilotiComponent } from './edit-piloti.component';

describe('EditPilotiComponent', () => {
  let component: EditPilotiComponent;
  let fixture: ComponentFixture<EditPilotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPilotiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPilotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
