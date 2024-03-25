import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUtentiComponent } from './search-utenti.component';

describe('SearchUtentiComponent', () => {
  let component: SearchUtentiComponent;
  let fixture: ComponentFixture<SearchUtentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchUtentiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
