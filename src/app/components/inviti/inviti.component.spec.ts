import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitiComponent } from './inviti.component';

describe('InvitiComponent', () => {
  let component: InvitiComponent;
  let fixture: ComponentFixture<InvitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
