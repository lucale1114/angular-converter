import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ExchangeRateService {
    constructor(private httpClient: HttpClient) {}

    get(fromCurrency: string | null | undefined, toCurrency: string | null | undefined): Observable<object> {
        console.log(fromCurrency);
        console.log(toCurrency);
        return this.httpClient.get(
            'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/' +
                fromCurrency +
                '/' +
                toCurrency +
                '.json',
        );
    }
}

@Injectable({ providedIn: 'root' })
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CurrentCurrencies {
    constructor(private httpClient: HttpClient) {}

    get(): Observable<object> {
        return this.httpClient.get(
            'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json',
        );
    }
}
