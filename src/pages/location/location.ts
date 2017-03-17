import { Component, OnInit } from '@angular/core';
import { NavController }     from 'ionic-angular';
import { CityService }       from './city.service';
import { Home }              from '../home/home';

@Component({
  selector: 'location-page',
  templateUrl: 'location.html'
})

export class Location implements OnInit {
  private cityList: string[];
  private selectedCity: string;
  
  constructor(private _cityService: CityService,
              private _navCtrl: NavController) {
    this.initializeItems();
    this.selectedCity = _cityService.getCity();
  }
  
  ngOnInit() {}
  
  initializeItems() {
    this.cityList = this._cityService.getCityNameList();
  }
  
  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    
    if (val && val.trim() != '') {
      this.cityList = this.cityList.filter((city) => {
        return (city.toLowerCase().indexOf(val.toLowerCase()) == 0);
      })
    }
  }
  
  onSelectCity(city: string) {
    this.selectedCity = city;
    this._cityService.setCity(city);
    this._navCtrl.setRoot(Home);
  }
}

