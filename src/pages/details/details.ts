import { Component, OnInit }      from '@angular/core';
import { CurrentForecastService } from '../services/currentforecast.service';
import { NavController }          from 'ionic-angular';
import { Home }                   from '../home/home';

@Component({
  selector: 'detail-page',
  templateUrl: './details.html'
})

export class Details implements OnInit{
  private fivedayForecast: Array<Object>;
  private chartLabels: Array<String> = [];
  private chartData:   Array<Object> = [];
  private chartOptions:any = {
    responsive: true
  };
  private chartColors:Array<any> = [
    {
      backgroundColor:           'rgba(250,250,130,0.2)',
      borderColor:               '#CBC159',
      pointBackgroundColor:      '#E7DB57',
      pointBorderColor:          '#FFFFFF',
      pointHoverBackgroundColor: '#FFFFFF',
      pointHoverBorderColor:     'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor:           'rgba(150, 131, 246, 0.2)',
      borderColor:               '#8394F6',
      pointBackgroundColor:      '#647AF5',
      pointBorderColor:          '#FFFFFF',
      pointHoverBackgroundColor: '#FFFFFF',
      pointHoverBorderColor:     'rgba(148,159,177,0.8)'
    }
  ];
  private chartLegend: boolean = true;
  private chartType:   string  = 'line';
  
  constructor(private _currentForecastService: CurrentForecastService,
              private _navController: NavController) {
  }
  
  ngOnInit() {
    this.getAndPrepareCurrentForecast();
    this.getFiveDaysNames();
    this.fillDataArray();
  }
  
  getAndPrepareCurrentForecast() {
    let tempForecast = this._currentForecastService.getCurrentForecast();
    this.fivedayForecast = new Array<Object>();
    this.fivedayForecast.push(tempForecast[0]);
    this.fivedayForecast.push(tempForecast[8]);
    this.fivedayForecast.push(tempForecast[16]);
    this.fivedayForecast.push(tempForecast[24]);
    this.fivedayForecast.push(tempForecast[32]);
  }
  
  fillDataArray() {
    let tempArr = [];
    for(let i in this.fivedayForecast) {
      tempArr.push(JSON.parse(JSON.stringify(this.fivedayForecast[i])).main.temp_max);
    }
    this.chartData.push({ data: tempArr, label: 'Day' });
    
    tempArr = [];
    for(let i in this.fivedayForecast) {
      tempArr.push(JSON.parse(JSON.stringify(this.fivedayForecast[i])).main.temp_min);
    }
    this.chartData.push({ data: tempArr, label: 'Night' });
  }
  
  getFiveDaysNames() {
    this.chartLabels.push(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][(new Date().getDay() - 1) % 7]);
    this.chartLabels.push(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][(new Date().getDay()    ) % 7]);
    this.chartLabels.push(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][(new Date().getDay() + 1) % 7]);
    this.chartLabels.push(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][(new Date().getDay() + 2) % 7]);
    this.chartLabels.push(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][(new Date().getDay() + 3) % 7]);
  }
  
  onCloseClick() {
    this._navController.setRoot(Home);
  }
}