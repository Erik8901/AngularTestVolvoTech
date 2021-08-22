import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../get-api.service'

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  weatherList: any = [];
  foreCastList: any = [];
  
constructor(private api: GetApiService) { }

  ngOnInit(): void {
      this.api.apiCallForeCast().subscribe((data: any) => {
          data.properties.timeseries.forEach((element: any) => {
         
            let today = new Date().toISOString().slice(8, 10)
            let todayApi = element.time.slice(8, 10)
           
            if(todayApi !== today) {
              
              if(element.time.includes("T12")) {
               
                this.weatherList.push(element)
              
             
        }//Get forecast at 12:00 + 6hours
            
      }
             
      });
      this.weatherList.length = 7
      this.weatherList.forEach((day: any) => {
        //Weatherlist 7 days forecast
        //.slice(1, 8)
        //.slice(0, 7)
        var d = new Date(day.time);
        // console.log(d.toString().slice(0, 4))
        // var dayName = this.weekDays[d.getDay()];
        
        let foreCastObj: any = {
          day: "",
          temp: "",
          windSpeed: "",
          weatherIcon: "",
          currentTemperatureMax: "",
          currentTemperatureMin: ""
        };

        foreCastObj.day = d.toString().slice(0, 4)
        //foreCastObj.day = dayName.slice(0, 3)
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

