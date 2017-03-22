import { Component, OnInit }   from '@angular/core';
import { CityService }         from '../location/city.service';
import { WeatherService }      from './weather.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.html'
})

export class Home implements OnInit{
  private selectedCity: string;
  private tomorrowDayName: any;
  private fiveDayForecast: Array<Object>;
  private isGetFiveDayForecast: boolean = false;
  
  constructor(private _cityService: CityService,
              private _weatherService: WeatherService) {
    this.selectedCity = this._cityService.getCity();
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
          this.fiveDayForecast.push(forecast[0]);
          this.fiveDayForecast.push(forecast[8]);
          this.fiveDayForecast.push(forecast[16]);
          this.fiveDayForecast.push(forecast[24]);
          this.fiveDayForecast.push(forecast[32]);
          this.checkWeather(this.fiveDayForecast[0]);
          this.checkWeather(this.fiveDayForecast[1]);
          this.checkWeather(this.fiveDayForecast[2]);
          this.checkWeather(this.fiveDayForecast[3]);
          this.checkWeather(this.fiveDayForecast[4]);
          this.isGetFiveDayForecast = true;
          
          console.log(this.fiveDayForecast);
        },
        error => console.log(error)
      );
  }
  
  getTomorrowDayName() {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday'][new Date().getDay() + 2];
  }
  
  checkWeather(currentForecast: any) {
    let weatherIcon;
    let weatherColor;
  
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
    if(currentForecast.main.temp > 0 && currentForecast.main.temp < 10) {
      currentForecast.backgroundColor = '#26A69A';
      currentForecast.fontColor = 'white';
    }
    if(currentForecast.main.temp > 10 && currentForecast.main.temp < 20) {
      currentForecast.backgroundColor = '#FFF176';
      currentForecast.fontColor = '#333';
    }
    if(currentForecast.main.temp > 20) {
      currentForecast.backgroundColor = '#FB8C00';
      currentForecast.fontColor = '#eee';
    }
  }
}
