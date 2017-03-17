import { Component, OnInit }   from '@angular/core';
import { CityService }         from '../location/city.service';
import { WeatherService }      from './weather.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.html'
})

export class Home implements OnInit{
  private selectedCity: string;
  private currentForecast: any;
  private isGetWeatherForecast: boolean = false;
  
  constructor(private _cityService: CityService,
              private _weatherService: WeatherService) {
    this.selectedCity = this._cityService.getCity();
    this.isGetWeatherForecast = false;
    this.getCurrentWeather();
  }
  
  ngOnInit() {
    
  }
  
  getCurrentWeather() {
    this.currentForecast = this._weatherService.getCurrentWeather(this.selectedCity).subscribe(
      weather => {
        this.currentForecast = weather;
        console.log(weather);
        this.checkCurrentWeather();
        this.isGetWeatherForecast = true;
      },
      error => console.log(error)
    );
  }
  
  checkCurrentWeather() {
    let weatherIcon;
    let weatherColor;
  
    if(this.currentForecast.weather[0].main == 'Clouds') {
      weatherIcon = 'cloudy';
    }
  
    if(this.currentForecast.weather[0].main == 'Clear') {
      weatherIcon = 'sunny';
    }
  
    if(this.currentForecast.weather[0].main == 'Rain') {
      weatherIcon = 'rainy';
    }
  
    if(this.currentForecast.main.temp < 0) {
      weatherColor = '#1E88E5';
    }
    if(this.currentForecast.main.temp > 0 && this.currentForecast.main.temp < 10) {
      weatherColor = '#26A69A';
    }
    if(this.currentForecast.main.temp > 10 && this.currentForecast.main.temp < 20) {
      weatherColor = '#FFF176';
    }
    if(this.currentForecast.main.temp > 20) {
      weatherColor = '#FB8C00';
    }
  
    this.currentForecast.icon = weatherIcon;
    this.currentForecast.color = weatherColor;
  }
}
