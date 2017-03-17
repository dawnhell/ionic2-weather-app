import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp,
         IonicModule,
         IonicErrorHandler }      from 'ionic-angular';
import { MyApp }                  from './app.component';
import { Home }                   from '../pages/home/home';
import { Location }               from '../pages/location/location';
import { CityService }            from "../pages/location/city.service";
import { WeatherService }         from '../pages/home/weather.service';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Location
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Location
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CityService,
    WeatherService
  ]
})
export class AppModule {}
