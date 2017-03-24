import { Component, OnInit }   from '@angular/core';
import { CityService }         from '../location/city.service';
import { WeatherService }      from './weather.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.html'
})

export class Home implements OnInit{
  private selectedCity:         string;
  private fiveDayForecast:      Array<Object>;
  private isGetFiveDayForecast: boolean = false;
  
  constructor(private _cityService: CityService,
              private _weatherService: WeatherService) {
    this.selectedCity         = this._cityService.getCity();
    this.isGetFiveDayForecast = false;
    this.getFiveDayForecast();
  }
  
  ngOnInit() {
    
  }
  
  getFiveDayForecast() {
    this._weatherService.getFiveDayForecast(this.selectedCity)
      .subscribe(
        forecast => {
          this.fiveDayForecast = new Array<Object>();
          
          for(let i = 0; i < forecast.length; ++i) {
            this.fiveDayForecast.push(forecast[i]);
            this.checkWeather(this.fiveDayForecast[i]);
          }
          this.isGetFiveDayForecast = true;
          
          console.log(this.fiveDayForecast);
        },
        error => console.log(error)
      );
  }
  
  getTomorrowDayName() {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][new Date().getDay() + 1];
  }
  
  checkWeather(currentForecast: any) {
    currentForecast.main.temp = Math.floor(currentForecast.main.temp);
    currentForecast.main.temp_max = Math.floor(currentForecast.main.temp_max);
    
    if(currentForecast.weather[0].main == 'Clouds') {
      currentForecast.icon = 'wi wi-day-cloudy';
    }
    if(currentForecast.weather[0].main == 'Clear') {
      currentForecast.icon = 'wi wi-day-sunny';
    }
    if(currentForecast.weather[0].main == 'Rain') {
      currentForecast.icon = 'wi wi-day-rain';
    }
    if(currentForecast.weather[0].main == 'Snow') {
      currentForecast.icon = 'wi wi-day-snow';
    }
    if(currentForecast.weather[0].main == 'Mist') {
      currentForecast.icon = 'wi wi-day-fog';
    }
    
    if(currentForecast.main.temp <= 0) {
      currentForecast.backgroundColor = '#1E88E5';
      currentForecast.fontColor = 'white';
    }
    if(currentForecast.main.temp > 0 && currentForecast.main.temp <= 10) {
      currentForecast.backgroundColor = '#26A69A';
      currentForecast.fontColor = 'white';
    }
    if(currentForecast.main.temp > 10 && currentForecast.main.temp <= 20) {
      currentForecast.backgroundColor = '#FFF176';
      currentForecast.fontColor = '#333';
    }
    if(currentForecast.main.temp > 20) {
      currentForecast.backgroundColor = '#FB8C00';
      currentForecast.fontColor = '#eee';
    }
  }
}
