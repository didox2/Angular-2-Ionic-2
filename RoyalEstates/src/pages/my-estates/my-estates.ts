import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationsPage, EstateHomePage  } from '../pages';
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { EstatesApiProvider } from "../../providers/estates-api/estates-api";
import { Events } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-my-estates',
  templateUrl: 'my-estates.html',
})

export class MyEstatesPage {
  estates = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public estateApi: EstatesApiProvider, 
              public settings: UserSettingsProvider, public events: Events) {
    this.estates = this.settings.getSavedEstates();
    events.subscribe("savedEstates:changed", data => {
      events.unsubscribe("savedEstates:changed");
      this.estates = this.settings.getSavedEstates();
    });
  }

  itemTapped($event, item) {
    this.estateApi.setCurrentEstate(item);
    this.navCtrl.push(EstateHomePage, { item: item });
  }

  goToLocations() {
    this.navCtrl.push(LocationsPage);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyEstatesPage");
  }

}
