import { Component } from '@angular/core';
import { CardCurrencyConverterComponent } from './card-currency-converter/card-currency-converter.component';
import { convertCurrency } from 'src/services/exchange-rate.service';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'card-currency-converter';

  test: any = convertCurrency().then(v => {this.test = v})
}
