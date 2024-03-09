import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampionatiComponent } from './campionati.component';

describe('CampionatiComponent', () => {
  let component: CampionatiComponent;
  let fixture: ComponentFixture<CampionatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampionatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampionatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
