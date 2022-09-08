import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, ReplaySubject, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {
  ExchangeRateService,
  CurrentCurrencies,
} from 'src/services/exchange-rate.service';

@Component({
  selector: 'app-card-currency-converter',
  templateUrl: './card-currency-converter.component.html',
  styleUrls: ['./card-currency-converter.component.scss'],
})
export class CardCurrencyConverterComponent implements OnInit {
  constructor(
    private exchangeRateService: ExchangeRateService,
    private allCurrencies: CurrentCurrencies
  ) {}

  ngOnInit() {
    this.allCurrencies.get().subscribe((ret: any) => {
      this.conversions = new Map(Object.entries(ret));

      this.conversionVals = [];
      this.conversions.forEach((k: string, v: string) => {
        this.conversionVals.push(v.toUpperCase() + ' ' + k);
      });

      this.filterOptionsFrom = new FormControl();
      this.filterOptionsTo = new FormControl();

      this.filteredOptions.next(this.conversionVals.slice());

      this.filterOptionsFrom.valueChanges.subscribe((value) => {
        this.filteredOptions.next(this._filter(value));
      });

      this.filteredOptions2.next(this.conversionVals.slice());

      this.filterOptionsTo.valueChanges.subscribe((value) => {
        this.filteredOptions2.next(this._filter(value));
      });

    if (localStorage.getItem('from') !== undefined) {
      this.formGroup.patchValue({ fromCurrency: localStorage.getItem('from') });
      this.formGroup.patchValue({ toCurrency: localStorage.getItem('to') });

      let from = this.formGroup.get('fromCurrency')?.value;
      let to = this.formGroup.get('toCurrency')?.value;

      this.displayFrom = this.getKeyFromString(from);
      this.displayTo = this.getKeyFromString(to);
      
      this.convertCurrency();
      this.noValues = false;
    } 
    });
  }

  selectChanged() {
    this.from = this.formGroup.get('fromCurrency')?.value;
    this.to = this.formGroup.get('toCurrency')?.value;

    this.displayFrom = this.getKeyFromString(this.from);
    this.displayTo = this.getKeyFromString(this.to);

    if (
      this.formGroup.get('fromCurrency')?.value !== "" &&
      this.formGroup.get('toCurrency')?.value !== ""
    ) {
      this.noValues = false;
      this.convertCurrency();
    }
  }

  convertCurrency() {
    this.from = this.formGroup.get('fromCurrency')?.value;
    this.to = this.formGroup.get('toCurrency')?.value;
    this.num = this.formGroup.get('amount')?.value;

    this.from = this.getByValue(this.conversions, this.from);
    this.to = this.getByValue(this.conversions, this.to);

    this.exchangeRateService.get(this.from, this.to).subscribe((ret: any) => {
      this.result = ret[this.to as string] * this.num!;
    });

    let from = this.formGroup.get('fromCurrency')?.value;
    let to = this.formGroup.get('toCurrency')?.value;

    localStorage.setItem('from', from!);
    localStorage.setItem('to', to!);
  }

  filteredOptions: ReplaySubject<string[]> = new ReplaySubject<string[]>();
  filteredOptions2: ReplaySubject<string[]> = new ReplaySubject<string[]>();

  formGroup = new FormGroup({
    fromCurrency: new FormControl(''),
    toCurrency: new FormControl(''),
    amount: new FormControl(1),
  });

  conversions: Map<string, string>;

  filterOptionsFrom: FormControl;
  filterOptionsTo: FormControl;

  conversionVals: string[];

  swapCurrencies() {
    let fromSaved: any = this.formGroup.get('fromCurrency')?.value;
    let toSaved: any = this.formGroup.get('toCurrency')?.value;

    this.formGroup.patchValue({ fromCurrency: toSaved });
    this.formGroup.patchValue({ toCurrency: fromSaved });

    this.selectChanged();
    this.convertCurrency();
  }

  getByValue(map: Map<string, string>, searchValue: any) {
    searchValue = searchValue.split(' ')[0];
    for (let [key, value] of map.entries()) {
      if (key === searchValue.toLowerCase()) {
        return key;
      }
    }
    return '';
  }

  getKeyFromString(searchValue: any) {
    let strs: string[] = searchValue.split(' ');
    searchValue = '';
    for (let i = 1; i < strs.length; i++) {
      if (searchValue !== '') {
        searchValue += ' ';
      }
      searchValue += strs[i];
    }
    return searchValue;
  }

  from: string | null | undefined;
  to: string | null | undefined;
  num: number | null | undefined;

  displayFrom: string = 'Euro';
  displayTo: string = 'Swedish krona';

  result: any = '';
  noValues: boolean = true;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.conversionVals.filter((v) =>
      v.toLowerCase().includes(filterValue)
    );
  }
}
