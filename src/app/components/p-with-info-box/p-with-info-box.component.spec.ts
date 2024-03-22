import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PWithInfoBoxComponent } from './p-with-info-box.component';

describe('PWithInfoBoxComponent', () => {
  let component: PWithInfoBoxComponent;
  let fixture: ComponentFixture<PWithInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PWithInfoBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PWithInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
