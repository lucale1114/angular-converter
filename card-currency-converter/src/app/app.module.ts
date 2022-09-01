import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardCurrencyConverterComponent } from './card-currency-converter/card-currency-converter.component';
import { BigInputComponent } from './shared/big-input/big-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { convertCurrency } from 'src/services/exchange-rate.service';

@NgModule({
  declarations: [
    AppComponent,
    CardCurrencyConverterComponent,
    BigInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
