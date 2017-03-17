import { Component, ViewChild }    from '@angular/core';
import { Nav, Platform }           from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Home }                    from '../pages/home/home';
import { Location }                from '../pages/location/location';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: Home },
      { title: 'Location', component: Location }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
