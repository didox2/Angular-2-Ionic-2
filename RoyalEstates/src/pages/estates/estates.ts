import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { EstatesApiProvider } from "../../providers/estates-api/estates-api";
import { EstateHomePage } from "../pages";

@IonicPage()
@Component({
  selector: 'page-estates',
  templateUrl: 'estates.html',
})
export class EstatesPage {
  location: any;
  estates = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public customApi: EstatesApiProvider, public loadingController: LoadingController) {
    this.location = navParams.get("item");
  }

  itemTapped($event, item) {
    this.customApi.setCurrentEstate(item);
    if (this.location.name === "Bulgaria") {
      this.location.name = item.locationName;
      this.location["id"] = item.locationId;
      this.customApi.getLocationEstateData(this.location).subscribe(data => {
        this.estates = data.estates;
      });
    }
    this.navCtrl.push(EstateHomePage, { item: item });
  }

  ionViewDidLoad() {
    if (this.location) {
      let loader = this.loadingController.create({
        content: "Loading estates from " + this.location.name,
        spinner: "dots"
      });
      loader.present().then(() => {
        this.customApi.getLocationEstateData(this.location)
          .subscribe(data => {
            this.estates = data.estates;
            loader.dismiss();
          });
      });
    } else {
      let loader = this.loadingController.create({
        content: "Loading estates from Bulgaria.",
        spinner: "dots"
      });
      loader.present().then(() => {
        this.customApi.getAllEstatesData().subscribe(data => {
          this.estates = [];
          data.map(location => {
            this.estates = this.estates.concat(location);
          });
          this.location = { name: "Bulgaria" };
          loader.dismiss();
        });
      });
    }
  }
}
