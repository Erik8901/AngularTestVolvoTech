import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../get-api.service'

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]
  weatherList: any = [];
  foreCastList: any = [];
  daysList: any = []

  constructor(private api: GetApiService) { }

  ngOnInit(): void {
    this.api.apiCallForeCast().subscribe((data: any) => {
     
      data.properties.timeseries.forEach((element: any) => {
       
        if (element.time.includes("T12")) {
           console.log(element)
          this.weatherList.push(element)
        }// Get forecast at 12:00 
      });
     // console.log(this.weatherList)
      this.weatherList.slice(1, 8).forEach((day: any) => {
       

        var d = new Date(day.time.slice(0, 10));
      
        console.log(d.toString().slice(0, 4))
        // console.log(d.toString().slice(0, 4))
        // var dayName = this.weekDays[d.getDay()];
        
        let dayObj: any = {
          nextDay: ""
        }
        dayObj.nextDay = d.toString().slice(0, 4)
        this.daysList.push(dayObj)
      
     
        //   console.log(day)
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
        //console.log(this.foreCastList.length)
        if(this.foreCastList.length === 7) {
          console.log("sev")
         
         // this.foreCastList.shift()
       // console.log(this.foreCastList)
        }
       
        // var dayToRemove = "Thursday"
        
        // var d = new Date();
        // var today: any = d.getDay() - 1;
        // this.weekDays.forEach((day, i) => {
        //   if (today === i) {
        //    dayToRemove = this.weekDays[i].slice(0, 3)
        //   }
        // })//Match current date with weekdays

      //   let list: any = [];
      //   list.push(foreCastObj)
      // console.log(list)

      //   list.forEach((weekDay:any, i:any) => {
      //   //  console.log(weekDay.day)
      //   //  console.log(dayToRemove.slice(0, 3))
      //     if(weekDay.day !== dayToRemove.slice(0, 3)) {
      //       console.log("here")
      //      console.log(list.splice(i, 1))
      //     }
      //   })
      
        
        
      
        
      
       
       // console.log(this.foreCastList)
        
        // this.foreCastList.forEach((element:any, i:any) => {
        //  // console.log(element.day)
        //   if(element.day === dayToRemove.slice(0, 3)) {
        //   //  console.log("here")
        //     //console.log(this.foreCastList)
        //   }
         
        
        // });
        
      //  var filteredAry = this.foreCastList.filter((e:any) => e.day !== dayToRemove.slice(0, 3))
        //console.log(filteredAry)

        // const index = this.foreCastList.indexOf(dayToRemove.slice(0, 3));
        //   if (index > -1) {
        //     this.foreCastList.splice(index, 1);
        // }
        // console.log(this.foreCastList)
      
      
        //  console.log(this.foreCastList)
      });//Weatherlist 7 days forecast
    })//ApiCall Function
  }//ngOnInit
}//WeatherForecastComponent

