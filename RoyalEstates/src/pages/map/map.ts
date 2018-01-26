import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstatesApiProvider } from "../../providers/estates-api/estates-api";
declare var window: any;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any = {};
  lat: number = 42.22;
  lng: number = 23.33;

  constructor(public navCtrl: NavController, public navParams: NavParams, public customApi: EstatesApiProvider) {
  }

  getDirections() { 
    console.log("get locations");
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

  ionViewDidLoad() {
    const estate = this.customApi.getCurrentEstate();
    if (estate) {
      this.lat = estate.latitude;
      this.lng = estate.longitude;
    }
    console.log("ionViewDidLoad MapPage");
  }
}
