import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCurrencyConverterComponent } from './card-currency-converter.component';

describe('CardCurrencyConverterComponent', () => {
  let component: CardCurrencyConverterComponent;
  let fixture: ComponentFixture<CardCurrencyConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCurrencyConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
