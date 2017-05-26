import { Component, OnInit }      from '@angular/core';
import { Network }                from '@ionic-native/network';
import { NavController }          from 'ionic-angular';
import { WeatherService }         from '../services/weather.service';
import { CityService }            from '../services/city.service';
import { Details }                from '../details/details';
import { CurrentForecastService } from '../services/currentforecast.service';
import { Storage }                from '@ionic/storage';

@Component({
  selector: 'home-page',
  templateUrl: './home.html'
})

export class Home implements OnInit{
  private selectedCity:         string;
  private fiveDayForecast:      Array<Object>;
  private isGetFiveDayForecast: boolean = false;
  private isFoundForecast:      boolean = false;
  
  constructor(private _cityService: CityService,
              private _weatherService: WeatherService,
              private _navController: NavController,
              private _network: Network,
              private _storage: Storage,
              private _currentForecastService: CurrentForecastService) {
    this.selectedCity         = this._cityService.getCity();
    this.isGetFiveDayForecast = false;
    this.isFoundForecast      = false;
  }
  
  ngOnInit() {
    this.getFiveDayForecast();
  }
  
  getFiveDayForecast() {
    if(this._network.type != "unknown" && this._network.type != "none") {
      this._weatherService.getFiveDayForecast(this.selectedCity)
        .subscribe(
          forecast => {
            this.fiveDayForecast = new Array<Object>();
            
            for(let i = 0; i < forecast.length; ++i) {
              this.fiveDayForecast.push(forecast[i]);
              this.checkWeather(this.fiveDayForecast[i]);
            }
        
            this.isGetFiveDayForecast = true;
            this.isFoundForecast = false;
            this._currentForecastService.setCurrentForecast(this.fiveDayForecast);
            this._storage.ready().then(() => {
              this._storage.set(this.selectedCity, JSON.stringify(this.fiveDayForecast));
            });
          },
          error => {
            console.log(error);
          }
        );
    }
    if(this._network.type == "none" || this._network.type == "unknown") {
      this._storage.ready().then(() => {
        this._storage.get(this.selectedCity)
          .then((file) => {
            file = JSON.parse(file);
            this.fiveDayForecast = new Array<Object>();
  
            for(let i = 0; i < file.length; ++i) {
              this.fiveDayForecast.push(file[i]);
              this.checkWeather(this.fiveDayForecast[i]);
            }
            this.isGetFiveDayForecast = true;
            this._currentForecastService.setCurrentForecast(this.fiveDayForecast);
          })
          .catch((error) => {
            this.isFoundForecast = true;
          });
      })
    }
  }
  
  onDetailClick() {
    this._navController.push(Details);
  }
  
  getTomorrowDayName() {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][(new Date().getDay() + 1) % 7];
  }
  
  checkWeather(currentForecast: any) {
    let date = new Date(Number.parseInt(currentForecast.dt) * 1000);
    currentForecast.main.temp     = Math.floor(currentForecast.main.temp);
    currentForecast.main.temp_max = Math.floor(currentForecast.main.temp_max);
    currentForecast.main.temp_min = Math.floor(currentForecast.main.temp_min);
    currentForecast.currentDate   = (date.getHours() == 0 ? 24 : date.getHours()) + ":" + (date.getMinutes() == 0 ? "00" : date.getMinutes());
    
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
  
  doRefresh(refresher) {
    this._navController.setRoot(this._navController.getActive().component);
    refresher.complete();
  }
}
