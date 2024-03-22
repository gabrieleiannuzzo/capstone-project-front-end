import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGaraComponent } from './edit-gara.component';

describe('EditGaraComponent', () => {
  let component: EditGaraComponent;
  let fixture: ComponentFixture<EditGaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGaraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
