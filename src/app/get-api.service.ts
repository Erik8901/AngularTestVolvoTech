import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(
    private http:HttpClient
  ) { }
  apiCallCurrent() {
    return this.http.get('https://api.met.no/weatherapi/nowcast/2.0/complete?lat=57.708870&lon=11.974560');
  }
  apiCallForeCast() {
    return this.http.get('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=57.708870&lon=11.974560&altitude=12');
  }
}
