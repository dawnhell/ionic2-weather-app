import { Injectable } from '@angular/core';

@Injectable()
export class CityService {
  private cityList = [
    { id: 620127, name :"Vitebsk",  country: "BY", coord: { lon: 30.2033,   lat: 55.190479 } },
    { id: 627907, name :"Gomel",    country: "BY", coord: { lon: 30.975401, lat: 52.434502 } },
    { id: 625144, name :"Minsk",    country: "BY", coord: { lon: 27.566668, lat: 53.900002 } },
    { id: 625665, name :"Mogilev",  country: "BY", coord: { lon: 30.33639,  lat: 53.913891 } },
    { id: 629634, name :"Brest",    country: "BY", coord: { lon: 23.700001, lat: 52.099998 } },
    { id: 627904, name :"Grodno",   country: "BY", coord: { lon: 23.8258,   lat: 53.6884   } }
  ];
  private selectedCity: string = 'Minsk';
  
  setCity(city: string) {
    this.selectedCity = city;
  }
  
  getCity() {
    return this.selectedCity;
  }
  
  getCityList() {
    return this.cityList;
  }
  
  getCityNameList() {
    let cityNameList = [];
    for(let i = 0; i < this.cityList.length; ++i) {
      cityNameList[i] = this.cityList[i].name;
    }
    return cityNameList;
  }
}