import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ExchangeRateService } from 'src/services/exchange-rate.service';

@Component({
  selector: 'app-card-currency-converter',
  templateUrl: './card-currency-converter.component.html',
  styleUrls: ['./card-currency-converter.component.scss']
})

export class CardCurrencyConverterComponent implements OnInit {

  constructor(private exchangeRateService: ExchangeRateService){}

  ngOnInit() {
    this.convertCurrency();
  }

  convertCurrency(){
    
    this.from = this.formGroup.get('fromCurrency')?.value;
    this.to = this.formGroup.get('toCurrency')?.value;
    this.num = this.formGroup.get('amount')?.value;
   
    this.exchangeRateService.get(this.from, this.to).subscribe((ret: any) =>{
      this.test = ret[this.to as string] * this.num!;
    })
  }

  filteredOptions: Observable<string[]>;

  formGroup = new FormGroup({
		fromCurrency: new FormControl('eur'),
		toCurrency: new FormControl('jpy'),
		amount: new FormControl(45),
	});

  conversions: Map<string, string> = new Map<string, string>([
    ["sek", "Swedish krona"],
    ["jpy", "Japanese yen"],
    ["eur", "Euro"],
  ])

  em: FormControl = new FormControl('');

  from: String | null | undefined;
  to: String | null | undefined;
  num: number | null | undefined;

  test: any;

}
