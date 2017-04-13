import { Component, OnInit }   from '@angular/core';
import { File }                from '@ionic-native/file';
import { Network }             from '@ionic-native/network';
import { WeatherService }      from './weather.service';
import { CityService }         from '../location/city.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.html'
})

export class Home implements OnInit{
  private selectedCity:         string;
  private fifeDayForecast:      Array<Object>;
  private isGetFifeDayForecast: boolean = false;
  private isFoundForecast:      boolean = false;
  
  constructor(private _cityService: CityService,
              private _weatherService: WeatherService,
              private _file: File,
              private _network: Network) {
    this.selectedCity         = this._cityService.getCity();
    this.isGetFifeDayForecast = false;
    this.isFoundForecast      = false;
    this.getFifedayForecastFromFile();
  }
  
  ngOnInit() {
    this.getFifeDayForecast();
  }
  
  writeFifedayForecastToFile(forecast: string) {
    this._file.checkFile(this._file.dataDirectory, this.selectedCity + '.json')
      .then(() => {
        this._file.writeExistingFile(this._file.dataDirectory, this.selectedCity + '.json', forecast);
      })
      .catch((error) => {
        this._file.createFile(this._file.dataDirectory, this.selectedCity + '.json', true)
        .then(_ => {
          this._file.writeExistingFile(this._file.dataDirectory, this.selectedCity + '.json', forecast);
        })
      });
  }
  
  getFifedayForecastFromFile() {
    this._file.checkFile(this._file.dataDirectory, this.selectedCity + '.json')
      .then(() => {
        this.isFoundForecast = false;
        this._file.readAsText(this._file.dataDirectory, this.selectedCity + '.json')
          .then((file) => {
            file = JSON.parse(file);
            this.fifeDayForecast = new Array<Object>();
  
            for(let i = 0; i < file.length; ++i) {
              this.fifeDayForecast.push(file[i]);
              this.checkWeather(this.fifeDayForecast[i]);
            }
            this.isGetFifeDayForecast = true;
          });
      })
      .catch((error) => {
        this.isFoundForecast = true;
      });
  }
  
  getFifeDayForecast() {
    // alert(this.fifeDayForecast[0].currentDate);
    if(this._network.type != "unknown" && this._network.type != "none") {
      this._weatherService.getFifeDayForecast(this.selectedCity)
        .subscribe(
          forecast => {
            this.fifeDayForecast = new Array<Object>();
            
            for(let i = 0; i < forecast.length; ++i) {
              this.fifeDayForecast.push(forecast[i]);
              this.checkWeather(this.fifeDayForecast[i]);
            }
        
            this.writeFifedayForecastToFile(JSON.stringify(forecast));
            this.isGetFifeDayForecast = true;
            this.isFoundForecast = false;
          },
          error => {
            console.log(error);
          }
        );
    }
    if(this._network.type == "none" || this._network.type == "unknown") {
      this.getFifedayForecastFromFile();
    }
  }
  
  getTomorrowDayName() {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][(new Date().getDay() + 1) % 7];
  }
  
  checkWeather(currentForecast: any) {
    let date = new Date(Number.parseInt(currentForecast.dt) * 1000);
    currentForecast.main.temp = Math.floor(currentForecast.main.temp);
    currentForecast.main.temp_max = Math.floor(currentForecast.main.temp_max);
    currentForecast.currentDate = (date.getHours() == 0 ? 24 : date.getHours()) + ":" + (date.getMinutes() == 0 ? "00" : date.getMinutes());
    
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
