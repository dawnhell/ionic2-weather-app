import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp,
         IonicModule,
         IonicErrorHandler }      from 'ionic-angular';
import { File }                   from '@ionic-native/file';
import { Network }                from '@ionic-native/network';
import { IonicStorageModule }     from '@ionic/storage';
import { MyApp }                  from './app.component';
import { Home }                   from '../pages/home/home';
import { Location }               from '../pages/location/location';
import { CityService }            from '../pages/services/city.service';
import { WeatherService }         from '../pages/services/weather.service';
import { Details }                from '../pages/details/details';
import { CurrentForecastService } from '../pages/services/currentforecast.service';
import { ChartsModule }           from "ng2-charts";
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Location,
    Details
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Location,
    Details
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CityService,
    WeatherService,
    CurrentForecastService,
    File,
    Network
  ]
})
export class AppModule {}
