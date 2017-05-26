import { Injectable } from '@angular/core';

@Injectable()
export class CurrentForecastService {
  private currentForecast: Array<Object>;
  
  setCurrentForecast(currentForecast: Array<Object>) {
    this.currentForecast = currentForecast;
  }
  
  getCurrentForecast() {
    return this.currentForecast;
  }
}