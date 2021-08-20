import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../get-api.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  currentDay = ""
  currentTime = ""
  currentTemperature = ""
  currentSky = ""
  currentWindSpeed = ""
  currentIcon = ""


  constructor(private api: GetApiService) {

  }

  ngOnInit(): void {

    this.api.apiCallForeCast().subscribe((data: any) => {
      //console.log("Get Api Current: ", data);
      var d = new Date();
      var today: any = d.getDay() - 1;

      let dateStr = d.toString().slice(7, 10);

      this.currentTime = new Date().toLocaleString().replace(',', '').slice(10, 16)

      this.weekDays.forEach((day, i) => {
        if (today === i) {
          this.currentDay = this.weekDays[i]
        }
      })//Match current date with weekdays

      data.properties.timeseries.forEach((element: any) => {
        if (Number(element.time.slice(8, 10)) === Number(dateStr)) {
          let timeNowFromApi = " " + String(element.time.slice(11, 13))
          let currentTimeNow = String(this.currentTime.slice(0, 3))

          if (currentTimeNow.includes(":")) {
            let morningTime = "0" + currentTimeNow.replace(":", " ")
            if (Number(timeNowFromApi) === Number(morningTime)) {
              this.currentTemperature = String(element.data.instant.details.air_temperature).slice(0, 2)
              this.currentWindSpeed = String(element.data.instant.details.wind_speed).slice(0, 1)
              this.currentSky = element.data.next_1_hours.summary.symbol_code.replace("_", " ")
              this.currentIcon = element.data.next_1_hours.summary.symbol_code
            }
          }// Morning time comparison, first digit starts with 0

          if(timeNowFromApi === this.currentTime.slice(0, 3)) {
            this.currentTemperature = String(element.data.instant.details.air_temperature).slice(0, 2)
            this.currentWindSpeed = String(element.data.instant.details.wind_speed).slice(0, 1)
            this.currentSky = element.data.next_1_hours.summary.symbol_code.replace("_", " ")
            this.currentIcon = element.data.next_1_hours.summary.symbol_code
          }//Afternoon time comparison, no 0 in first digit
        }
      });

      // Api call from Nowcast
      // console.log(this.currentTime)
      // this.currentTemperature = data.properties.timeseries[0].data.instant.details.air_temperature
      //this.currentSky = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code.replace("_", " ")
      //  this.currentWindSpeed = String(data.properties.timeseries[0].data.instant.details.wind_speed).slice(0, 1)
      // this.currentIcon = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code
    })
  }
}
