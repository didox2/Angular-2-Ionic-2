import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EstatesPage } from '../pages';
import { EstatesApiProvider } from "../../providers/estates-api/estates-api";

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  locations: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public customApi: EstatesApiProvider, public loadingController: LoadingController) {
  }

  itemTapped($event, item) {
    this.navCtrl.push(EstatesPage, { item: item });
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Getting locations",
      spinner: "dots"
    });
    loader.present().then(() => {
      this.customApi.getLocations().subscribe(locations => {
        this.locations = locations;
        loader.dismiss();
      });
    });
  }
}
