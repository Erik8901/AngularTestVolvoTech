import { Component, OnInit, } from '@angular/core';
import { GetApiService } from '../get-api.service'
interface IForeCastList {
  day: string;
  temp: string
  windSpeed: string
  weatherIcon: string
  currentTemperatureMax: string;
  currentTemperatureMin: string;
}
@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})

export class WeatherForecastComponent implements OnInit {
  weatherList: Array<Number> = [];
  foreCastList: Array<IForeCastList> = [];
  constructor(private api: GetApiService) {
  }

  ngOnInit(): void {
    this.api.apiCallForeCast().subscribe((data: any) => {
      data.properties.timeseries.forEach((element: any) => {

        let today = new Date().toISOString().slice(8, 10)
        let todayApi = element.time.slice(8, 10)

        if (todayApi !== today) {

          if (element.time.includes("T12")) {
            this.weatherList.push(element)
          }//Get forecast at 12:00 + 6hours
        }// Compare todays date with Api today and do not use it
      });
      this.weatherList.length = 7
      this.weatherList.forEach((day: any) => {
        //Weatherlist 7 days forecast

        var d = new Date(day.time);

        let foreCastObj: any = {
          day: "",
          temp: "",
          windSpeed: "",
          weatherIcon: "",
          currentTemperatureMax: "",
          currentTemperatureMin: ""
        };

        foreCastObj.day = d.toString().slice(0, 4)
        foreCastObj.currentTemperatureMin = String(day.data.next_6_hours.details.air_temperature_min).slice(0, 2)
        foreCastObj.currentTemperatureMax = String(day.data.next_6_hours.details.air_temperature_max).slice(0, 2)
        foreCastObj.temp = String(day.data.instant.details.air_temperature).slice(0, 2)
        foreCastObj.windSpeed = String(day.data.instant.details.wind_speed).slice(0, 1)
        foreCastObj.weatherIcon = day.data.next_6_hours.summary.symbol_code

        this.foreCastList.push(foreCastObj)
      });//Weatherlist 7 days forecast
    })//ApiCall Function
  }//ngOnInit
}//WeatherForecastComponent