import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGareComponent } from './lista-gare.component';

describe('ListaGareComponent', () => {
  let component: ListaGareComponent;
  let fixture: ComponentFixture<ListaGareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaGareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaGareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
