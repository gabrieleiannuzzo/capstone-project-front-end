import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampionatoComponent } from './campionato.component';

describe('CampionatoComponent', () => {
  let component: CampionatoComponent;
  let fixture: ComponentFixture<CampionatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampionatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampionatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
