import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificaGaraComponent } from './classifica-gara.component';

describe('ClassificaGaraComponent', () => {
  let component: ClassificaGaraComponent;
  let fixture: ComponentFixture<ClassificaGaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificaGaraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassificaGaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
