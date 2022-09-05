import {HttpClient} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


let url =
    'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json';

@Injectable({providedIn: 'root'})
    export class ExchangeRateService {
    
      constructor(private httpClient: HttpClient) { }
    
      get(fromCurrency : any, toCurrency : any): Observable<Object> {
        console.log(fromCurrency);
        console.log(toCurrency);
        return this.httpClient.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + fromCurrency + "/" + toCurrency + ".json");
      }
    }

@Injectable({providedIn: 'root'})
export class CurrentCurrencies {
    constructor(private httpClient: HttpClient) { }
    
      get(): Observable<Object> {
        return this.httpClient.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json");
      }
}



// let url =
//   'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json';
// let urlNotSet =
//   'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';
    
// export function convertCurrency(toCurrency: string): Promise<number> {
//   return fetch(url)
//     .then((res) => {
//      if (!res.ok) {
//             throw new Error(res.statusText)
//       }
//       return res.json();
//     })
//     .then((res) => {
//       console.log(res[toCurrency]);
//       return res[toCurrency];
//     })
// }