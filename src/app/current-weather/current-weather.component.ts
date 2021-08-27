import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../get-api.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  weekDays: Array<String> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  currentDay: string = ""
  currentTime: string = ""
  currentTemperatureMax: string = ""
  currentTemperatureMin: string = ""
  currentSky: string = ""
  currentWindSpeed: string = ""
  currentIcon: string = ""

  constructor(private api: GetApiService) {

  }

  ngOnInit(): void {
    // Both ApiCallCurrent and ApicallForecast work, however forecast is more accurate.
    this.api.apiCallForeCast().subscribe((data: any) => {
      //Compare todays date with date from API
      var d = new Date();
      let dateStr = d.toString().slice(7, 10);
     
      this.currentTime = new Date().toLocaleString().replace(',', '').slice(10, 16)

      var dayName = this.weekDays[new Date().getDay()];
      this.currentDay = String(dayName)

      data.properties.timeseries.forEach((element: any) => {
        if (Number(element.time.slice(8, 10)) === Number(dateStr)) {

          let timeNowFromApi = " " + String(element.time.slice(11, 13))
          let currentTimeNow = String(this.currentTime.slice(0, 3))

          if (currentTimeNow.includes(":")) {
          let morningTime = "0" + currentTimeNow.replace(":", " ")
            if (Number(timeNowFromApi) === Number(morningTime)) {
              this.currentTemperatureMin = String(element.data.next_6_hours.details.air_temperature_min).slice(0, 2)
              this.currentTemperatureMax = String(element.data.next_6_hours.details.air_temperature_max).slice(0, 2)
              this.currentWindSpeed = String(element.data.instant.details.wind_speed).slice(0, 1)
              this.currentSky = element.data.next_1_hours.summary.symbol_code.replace("_", " ")
              this.currentIcon = element.data.next_1_hours.summary.symbol_code
            }
          }// Morning time comparison, first digit starts with 0

          if (timeNowFromApi === this.currentTime.slice(0, 3)) {
            this.currentTemperatureMin = String(element.data.next_6_hours.details.air_temperature_min).slice(0, 2)
            this.currentTemperatureMax = String(element.data.next_6_hours.details.air_temperature_max).slice(0, 2)
            this.currentWindSpeed = String(element.data.instant.details.wind_speed).slice(0, 1)
            this.currentSky = element.data.next_1_hours.summary.symbol_code.replace("_", " ")
            this.currentIcon = element.data.next_1_hours.summary.symbol_code
          }//Afternoon time comparison, no 0 in first digit
        }
      });

      // Api call from Nowcast
      // this.currentTemperature = data.properties.timeseries[0].data.instant.details.air_temperature
      // this.currentSky = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code.replace("_", " ")
      // this.currentWindSpeed = String(data.properties.timeseries[0].data.instant.details.wind_speed).slice(0, 1)
      // this.currentIcon = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code

    })//apiCallForeCast
  }//ngOnInit
}//CurrentWeatherComponent