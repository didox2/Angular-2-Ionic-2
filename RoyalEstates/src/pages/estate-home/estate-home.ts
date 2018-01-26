import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EstatesApiProvider } from "../../providers/estates-api/estates-api";
import { OverviewPage, MapPage, SimilarPage } from "../pages";

@IonicPage()
@Component({
  selector: 'page-estate-home',
  templateUrl: 'estate-home.html',
})

export class EstateHomePage {
  estate: any = {};
  OverviewPageTab: any;
  MapPageTab: any;
  SimilarPageTab: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public customApi: EstatesApiProvider, public events: Events) {
    this.estate = navParams.get("item");
    this.estate = this.estate ? this.estate : this.customApi.getCurrentEstate();
    this.OverviewPageTab = OverviewPage;
    this.MapPageTab = MapPage;
    this.SimilarPageTab = SimilarPage;
    events.unsubscribe("estate:changed");
    events.subscribe("estate:changed", data => {
      events.unsubscribe("estate:changed");
      this.navCtrl.pop();
      this.navCtrl.push(this.navCtrl.getActive().component)
    });
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

}
