import { Component, ViewChild  } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyEstatesPage } from "../pages/pages";
import { LocationsPage, EstatesPage, EstateHomePage } from "../pages/pages";
import { UserSettingsProvider } from "../providers/user-settings/user-settings";
import { EstatesApiProvider } from "../providers/estates-api/estates-api";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MyEstatesPage;
  estates = [];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
              public userSettings: UserSettingsProvider, public customApi: EstatesApiProvider, public events: Events) {
    this.initializeApp();
    this.estates = this.userSettings.getSavedEstates();    
    events.subscribe("estates:changed", data => {
      events.unsubscribe("estates:changed");
      this.estates = this.userSettings.getSavedEstates();
    });
  }

  goToLocations() {
    this.nav.push(LocationsPage);
  }

  goToSavedEstates() {
    this.nav.push(EstatesPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  itemTapped($event, item) {
    this.customApi.setCurrentEstate(item);
    this.nav.push(EstateHomePage, { item: item });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
