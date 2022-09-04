import { Component, OnInit } from '@angular/core';
import { CardCurrencyConverterComponent } from './card-currency-converter/card-currency-converter.component';
import { ExchangeRateService } from 'src/services/exchange-rate.service';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  title = 'card-currency-converter';
 

  //test: any = convertCurrency("jpy").then(v => {this.test = v})
}
