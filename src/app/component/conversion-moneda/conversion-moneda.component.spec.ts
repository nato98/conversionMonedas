import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionMonedaComponent } from './conversion-moneda.component';

describe('ConversionMonedaComponent', () => {
  let component: ConversionMonedaComponent;
  let fixture: ComponentFixture<ConversionMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversionMonedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
