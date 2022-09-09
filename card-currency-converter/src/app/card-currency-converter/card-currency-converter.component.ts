// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import {
    ExchangeRateService,
    CurrentCurrencies,
} from 'src/services/exchange-rate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-card-currency-converter',
    templateUrl: './card-currency-converter.component.html',
    styleUrls: ['./card-currency-converter.component.scss'],
    })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CardCurrencyConverterComponent implements OnInit {
    formGroup = new FormGroup({
        fromCurrency: new FormControl(''),
        toCurrency: new FormControl(''),
        amount: new FormControl(1),
    });

    filteredOptions: ReplaySubject<string[]> = new ReplaySubject<string[]>();

    filteredOptions2: ReplaySubject<string[]> = new ReplaySubject<string[]>();

    conversions: Map<string, string>;

    filterOptionsFrom: FormControl;

    filterOptionsTo: FormControl;

    conversionVals: string[];

    from: string | null | undefined;

    to: string | null | undefined;

    num: number | null | undefined;

    displayFrom: string = 'Välj en valuta';

    displayTo: string = 'Välj en valuta';

    result: number | null | undefined;

    noValues: boolean = true;

    constructor(
        private exchangeRateService: ExchangeRateService,
        private allCurrencies: CurrentCurrencies,
        private translate: TranslateService,
    ) {
        translate.setDefaultLang('en');
        translate.use('sv');
    }

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
                this.filteredOptions.next(this.filter(value));
            });

            this.filteredOptions2.next(this.conversionVals.slice());

            this.filterOptionsTo.valueChanges.subscribe((value) => {
                this.filteredOptions2.next(this.filter(value));
            });

            if (localStorage.getItem('from') !== undefined) {
                this.formGroup.patchValue({
                    fromCurrency: localStorage.getItem('from'),
                });
                this.formGroup.patchValue({
                    toCurrency: localStorage.getItem('to'),
                });

                const from = this.formGroup.get('fromCurrency')?.value;
                const to = this.formGroup.get('toCurrency')?.value;

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
            this.formGroup.get('fromCurrency')?.value !== '' &&
            this.formGroup.get('toCurrency')?.value !== ''
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

        this.exchangeRateService
            .get(this.from, this.to)
            .subscribe((ret: any) => {
                if (this.num !== undefined && this.num !== null) {
                    this.result = ret[this.to as string] * this.num;
                }
            });

        const from = this.formGroup.get('fromCurrency')?.value;
        const to = this.formGroup.get('toCurrency')?.value;

        localStorage.setItem('from', from as string);
        localStorage.setItem('to', to as string);
    }

    swapCurrencies() {
        const fromSaved: string | null | undefined =
            this.formGroup.get('fromCurrency')?.value;
        const toSaved: string | null | undefined =
            this.formGroup.get('toCurrency')?.value;

        this.formGroup.patchValue({ fromCurrency: toSaved });
        this.formGroup.patchValue({ toCurrency: fromSaved });

        this.selectChanged();
        this.convertCurrency();
    }

    getByValue(
        map: Map<string, string>,
        searchValue: string | null | undefined,
    ) {
        if (searchValue !== undefined && searchValue !== null) {
            searchValue = searchValue.split(' ')[0];
        }
        const s = searchValue as string;
        for (const key of map.keys()) {
            if (key === s.toLowerCase()) {
                return key;
            }
        }
        return '';
    }

    getKeyFromString(searchValue: string | null | undefined) {
        let s = searchValue as string;
        const strs: string[] | null | undefined = s.split(' ');
        s = '';
        for (let i = 1; i < strs.length; i++) {
            if (s !== '') {
                s += ' ';
            }
            s += strs[i];
        }
        return s;
    }

    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.conversionVals.filter((v) =>
            v.toLowerCase().includes(filterValue),
        );
    }
}
