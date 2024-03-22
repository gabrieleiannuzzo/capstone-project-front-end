import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampionatoUsersComponent } from './edit-campionato-users.component';

describe('EditCampionatoUsersComponent', () => {
  let component: EditCampionatoUsersComponent;
  let fixture: ComponentFixture<EditCampionatoUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCampionatoUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCampionatoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
