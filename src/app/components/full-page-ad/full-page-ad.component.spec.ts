import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageAdComponent } from './full-page-ad.component';

describe('FullPageAdComponent', () => {
  let component: FullPageAdComponent;
  let fixture: ComponentFixture<FullPageAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullPageAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullPageAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
