import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiGaraComponent } from './dati-gara.component';

describe('DatiGaraComponent', () => {
  let component: DatiGaraComponent;
  let fixture: ComponentFixture<DatiGaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatiGaraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatiGaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
