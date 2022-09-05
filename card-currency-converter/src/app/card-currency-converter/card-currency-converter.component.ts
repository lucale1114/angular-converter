import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ExchangeRateService, CurrentCurrencies } from 'src/services/exchange-rate.service';

@Component({
  selector: 'app-card-currency-converter',
  templateUrl: './card-currency-converter.component.html',
  styleUrls: ['./card-currency-converter.component.scss']
})

export class CardCurrencyConverterComponent implements OnInit {

  constructor(private exchangeRateService: ExchangeRateService, private allCurrencies: CurrentCurrencies){}

  ngOnInit() {
    // this.conversions = new Map(Object.entries(this.allCurrencies.get()));
    // console.log(this.conversions);
    this.allCurrencies.get().subscribe((ret: any) =>{
      this.conversions = new Map(Object.entries(ret));
      this.conversionVals = Array.from(this.conversions.values());
    })
    
    this.filteredOptions = this.formGroup.get('fromCurrency')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredOptions2 = this.formGroup.get('toCurrency')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    //console.log(this.filteredOptions)
    
    this.convertCurrency();
  }

  convertCurrency(){
    this.from = this.formGroup.get('fromCurrency')?.value;
    this.to = this.formGroup.get('toCurrency')?.value;
    this.num = this.formGroup.get('amount')?.value;
   
    this.from = this.getByValue(this.conversions, this.from);
    this.to = this.getByValue(this.conversions, this.to);

    console.log(this.from);
    console.log(this.to)
    this.exchangeRateService.get(this.from, this.to).subscribe((ret: any) =>{
      this.test = ret[this.to as string] * this.num!;
    })
  }

  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;

  formGroup = new FormGroup({
		fromCurrency: new FormControl('Euro'),
		toCurrency: new FormControl('Swedish krona'),
		amount: new FormControl(1),
	});

  conversions: Map<string, string> = new Map<string, string>([
    
  ])
  conversionVals: string[]

  getByValue(map: Map<string, string>, searchValue: any) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue) {
        return key;
      }
    }
    return "";
  }

  from: String | null | undefined;
  to: String | null | undefined;
  num: number | null | undefined;

  test: any;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.conversionVals.filter(v =>  v.toLowerCase().includes(filterValue));
  }

}
