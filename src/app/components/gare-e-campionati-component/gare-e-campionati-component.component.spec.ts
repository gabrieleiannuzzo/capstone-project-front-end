import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GareECampionatiComponentComponent } from './gare-e-campionati-component.component';

describe('GareECampionatiComponentComponent', () => {
  let component: GareECampionatiComponentComponent;
  let fixture: ComponentFixture<GareECampionatiComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GareECampionatiComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GareECampionatiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
